/* eslint-disable no-unused-vars*/
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import ResolveAuthScreen from '../screens/ResolveAuthScreen'
import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    ResolveAuth: ResolveAuthScreen,
    LoginStack: LoginNavigator,
    Main: MainTabNavigator,
  })
)
