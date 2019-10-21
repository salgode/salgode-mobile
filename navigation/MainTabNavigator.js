import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import SettingsScreen from '../screens/SettingsScreen'
import CreateTripScreen from '../screens/CreateTripScreen'
import AddStopsScreen from '../screens/AddStopsScreen'
import ChooseTripsScreen from '../screens/ChooseTripsScreen'
import TripsNavigator from './TripsNavigator'
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

const ChooseTripsStack = createStackNavigator({
  ChooseTrips: ChooseTripsScreen,
})
const EditProfileStack = createStackNavigator(
  {
    EditProfile: EditProfileScreen,
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
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-options'}
    />
  ),
}

SettingsStack.path = ''

const CreateTripStack = createStackNavigator(
  {
    CreateTripScreen,
    AddStopsScreen,
  },
  config
)

CreateTripStack.navigationOptions = {
  tabBarLabel: 'Crear Viaje',
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

CreateTripStack.path = ''

const tabNavigator = createBottomTabNavigator({
  ChooseTripsStack,
  TripsStack,
  EditProfileStack,
  // SettingsStack,
  CreateTripStack,
})

tabNavigator.path = ''

export default tabNavigator
