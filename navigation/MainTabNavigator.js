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
import ChooseTripsScreen from '../screens/ChooseTripsScreen'

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

const MyTripsStack = createStackNavigator(
  {
    MyTrips: TripsNavigator,
  },
  config
)

MyTripsStack.navigationOptions = {
  tabBarLabel: 'Viajes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'}
    />
  ),
}

MyTripsStack.path = ''

const ChooseTripsStack = createStackNavigator(
  {
    ChooseTrips: ChooseTripsScreen,
  },
  config
)

ChooseTripsStack.navigationOptions = {
  tabBarLabel: 'Pedir Viaje',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-car' : 'md-car'}
    />
  ),
}

ChooseTripsStack.path = ''

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
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-options'}
    />
  ),
}

SettingsStack.path = ''

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  MyTripsStack,
  ChooseTripsStack,
  SettingsStack,
})

tabNavigator.path = ''

export default tabNavigator
