import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import SettingsScreen from '../screens/SettingsScreen'
import TripsNavigator from './TripsNavigator'
import MyTripsNavigator from './MyTripsNavigator'
import EditProfileScreen from '../screens/EditProfileScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

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

const EditProfileStack = createStackNavigator(
  {
    EditProfile: EditProfileScreen,
  },
  config
)

EditProfileStack.navigationOptions = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="md-person" />
  ),
}

EditProfileStack.path = ''

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
  TripsStack,
  MyTripsStack,
  EditProfileStack,
  SettingsStack,
})

tabNavigator.path = ''

export default tabNavigator
