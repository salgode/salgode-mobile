import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import TripsNavigator from './TripsNavigator'
import MyTripsNavigator from './MyTripsNavigator'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
)

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
}

HomeStack.path = ''

const TripsStack = createStackNavigator(
  {
    Trips: TripsNavigator,
  },
  config
)

TripsStack.navigationOptions = {
  tabBarLabel: 'Viajes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'}
    />
  ),
}

TripsStack.path = ''

const MyTripsStack = createStackNavigator(
  {
    MyTrips: MyTripsNavigator,
  },
  config
)

MyTripsStack.navigationOptions = {
  tabBarLabel: 'Mis Viajes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-journal' : 'md-journal'}
    />
  ),
}

MyTripsStack.path = ''

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
)

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

SettingsStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  TripsStack,
  MyTripsStack,
  SettingsStack,
})

tabNavigator.path = ''

export default tabNavigator
