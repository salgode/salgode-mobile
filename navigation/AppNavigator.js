import React from 'react' // eslint-disable-line no-unused-vars
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import { store } from '../redux/store'

const renderRoutes = () => {
  // Verify Session
  const token = store.getState().user.token
  const userNotLoggedInNav = {
    LoginStack: LoginNavigator,
    Main: MainTabNavigator,
  }
  const userLoggedInNav = {
    Main: MainTabNavigator,
    LoginStack: LoginNavigator,
  }
  return token ? userLoggedInNav : userNotLoggedInNav
}

export default createAppContainer(createSwitchNavigator(renderRoutes()))
