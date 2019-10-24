/* eslint-disable no-unused-vars*/
import { AsyncStorage } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import ResolveAuthScreen from '../screens/ResolveAuthScreen'
import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import TripRequest from '../components/Trips/TripRequest'

const token = AsyncStorage.getItem('@userToken')
const userNotLoggedInNav = {
  LoginStack: LoginNavigator,
  Main: MainTabNavigator,
}
const userLoggedInNav = {
  Main: MainTabNavigator,
  LoginStack: LoginNavigator,
}


export default createAppContainer(
  createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    token ? userLoggedInNav : userNotLoggedInNav
  )
)
