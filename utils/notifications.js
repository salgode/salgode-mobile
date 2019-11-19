import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import Constants from 'expo-constants'
import { AsyncStorage } from 'react-native'
import { getOwnProfile } from '../redux/actions/user'
import { dispatch } from 'react-redux'
import userModel from '../redux/models/user'

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

const dispatchNavigation = (navigation, notificationData) => {
  const { action, resource, resource_id } = notificationData
  if (action === 'decline' && resource === 'trip') {
    navigation.navigate('Pedidos')
  } else if (action === 'request' && resource === 'trip' && resource_id) {
    navigation.navigate('DetailedTrip', {
      asDriver: true,
      trip_id: resource_id,
    })
  } else if (action === 'accept' && resource === 'trip' && resource_id) {
    // TODO
    navigation.navigate('ReservationDetails', {
      userData: null,
      vehicle: null, // TODO: Ver como llegan a RequestedTrip.js
    })
  }
}

export const handleNotification = navigation => {
  return async notification => {
    console.log(notification)
    const userToken = await AsyncStorage.getItem('@userToken').then(JSON.parse)
    const userId = await AsyncStorage.getItem('@userId').then(JSON.parse)
    if (!userToken || !userId) return
    if (notification.origin === 'selected') {
      if (!userModel.email) {
        const response = await dispatch(getOwnProfile(userToken))
        if (!response || response.error) return
      }
      // TODO: Navegar
      dispatchNavigation(navigation, notification.data)
    }
  }
}
