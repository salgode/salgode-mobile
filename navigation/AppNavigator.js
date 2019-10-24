/* eslint-disable no-unused-vars*/
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import React from 'react'
import MainTabNavigator from './MainTabNavigator'
import LoginNavigator from './LoginNavigator'
import { store } from '../redux/store'

// const token = AsyncStorage.getItem("@userToken");
const renderRoutes = () => {
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
