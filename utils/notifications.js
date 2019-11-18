import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import { AsyncStorage } from 'react-native'
import { getOwnProfile } from '../redux/actions/user'
import { dispatch } from 'react-redux'

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

  return Notifications.getExpoPushTokenAsync()
}

export const handleNotification = async (notification, navigation) => {
  console.log(notification)
  const userToken = await AsyncStorage.getItem('@userToken').then(JSON.parse)
  const userId = await AsyncStorage.getItem('@userId').then(JSON.parse)
  if (!userToken || !userId) return
  if (notification.origin === 'selected') {
    // TODO: Re autentificar
    const response = await dispatch(getOwnProfile(userToken))
    // TODO: Si no fue autentificado, terminar
    if (!response || response.error) return
    // TODO: Navegar
  }
}
