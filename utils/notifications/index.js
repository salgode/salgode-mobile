import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import { AsyncStorage } from 'react-native'
import { getOwnProfile } from '../../redux/actions/user'
import userModel from '../../redux/models/user'
import { store } from '../../redux/store'
import {
  declineReservation,
  requestTrip,
  acceptReservation,
} from './notificationActions'

export const registerForPushNotifications = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  )
  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return null
  }

  if (Constants.isDevice) {
    return Notifications.getExpoPushTokenAsync()
  }
}

const dispatchNavigation = async (navigation, notificationData, userToken) => {
  const { action, resource, resource_id } = notificationData
  if (action === 'decline' && resource === 'reservation') {
    declineReservation(navigation)
  } else if (action === 'request' && resource === 'trip' && resource_id) {
    requestTrip(navigation, resource_id)
  } else if (action === 'accept' && resource === 'reservation' && resource_id) {
    acceptReservation(navigation, resource_id, userToken)
  }
}

export const handleNotification = navigation => {
  return async notification => {
    // console.log(notification)
    const userToken = await AsyncStorage.getItem('@userToken').then(JSON.parse)
    const userId = await AsyncStorage.getItem('@userId').then(JSON.parse)
    if (!userToken || !userId) return
    if (notification.origin === 'selected') {
      if (!userModel.email) {
        const response = await store.dispatch(getOwnProfile(userToken))
        if (!response || response.error) return
      }
      dispatchNavigation(navigation, notification.data, userToken)
    }
  }
}
