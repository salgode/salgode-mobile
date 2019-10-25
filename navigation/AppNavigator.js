import React, { Component } from 'react' // eslint-disable-line no-unused-vars
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
// import { store } from '../redux/store'
import ResolveAuthScreen from '../screens/ResolveAuthScreen'

const renderRoutes = () => {
  // Verify Session
  // const token = store.getState().user.token
  // console.log(token)
  // const userNotLoggedInNav = {
  //   LoginStack: LoginNavigator,
  //   Main: MainTabNavigator,
  // }
  // const userLoggedInNav = {
  //   Main: MainTabNavigator,
  //   LoginStack: LoginNavigator,
  // }
  // return token ? userLoggedInNav : userNotLoggedInNav

  return {
    ResolveAuthScreen,
    Main: MainTabNavigator,
    LoginNavigator,
  }
}

export default createAppContainer(createSwitchNavigator(renderRoutes()))
