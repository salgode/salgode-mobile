import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import CreateTripScreen from '../screens/CreateTripScreen'
import AddStopsScreen from '../screens/AddStopsScreen'
import SpotSelectorScreen from '../screens/SpotSelectorScreen'
import ChooseTripsScreen from '../screens/ChooseTripsScreen'
import TripsNavigator from './TripsNavigator'
import EditProfileScreen from '../screens/EditProfileScreen'
import DetailedTripScreen from '../screens/DetailedTripScreen'
import TripRequestScreen from '../screens/TripRequestScreen'
import CurrentStartScreen from '../screens/CurrentTrip/CurrentStartScreen'
import CurrentStopScreen from '../screens/CurrentTrip/CurrentStopScreen'
import CurrentFinishScreen from '../screens/CurrentTrip/CurrentFinishScreen'
import TripDetailsScreen from '../screens/TripDetailsScreen'
import MapScreen from '../screens/MapScreen'
import TermScreen from '../screens/Webviews/TermScreen'
import PrivacyScreen from '../screens/Webviews/PrivacyScreen'
import TwitterScreen from '../screens/Webviews/TwitterScreen'
import InstagramScreen from '../screens/Webviews/InstagramScreen'
import LandingScreen from '../screens/Webviews/LandingScreen'
import SupportScreen from '../screens/Webviews/SupportScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
})

const TripsStack = createStackNavigator(
  {
    Trips: TripsNavigator,
    DetailedTrip: DetailedTripScreen,
    StartTrip: CurrentStartScreen,
    StopTrip: CurrentStopScreen,
    FinishTrip: CurrentFinishScreen,
    ReservationDetails: TripDetailsScreen,
  },
  config
)

TripsStack.navigationOptions = {
  tabBarLabel: 'Mis Viajes',
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
  RequestTrip: TripRequestScreen,
  SpotSelectorScreen,
  TripDetails: TripDetailsScreen,
  SpotsMap: MapScreen,
  // UserProfile: UserProfileScreen,
})
const EditProfileStack = createStackNavigator(
  {
    EditProfile: EditProfileScreen,
    TermsProfile: TermScreen,
    PrivacyProfile: PrivacyScreen,
    Twitter: TwitterScreen,
    Instagram: InstagramScreen,
    Landing: LandingScreen,
  },
  config
)

ChooseTripsStack.navigationOptions = {
  tabBarLabel: 'Pedir Viaje',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'}
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

const CreateTripStack = createStackNavigator(
  {
    CreateTripScreen,
    AddStopsScreen,
    SpotSelectorScreen,
    Support: SupportScreen,
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
          ? `ios-add-circle${focused ? '' : '-outline'}`
          : 'md-add-circle'
      }
    />
  ),
}

CreateTripStack.path = ''

const tabNavigator = createBottomTabNavigator({
  ChooseTripsStack,
  TripsStack,
  CreateTripStack,
  EditProfileStack,
})

tabNavigator.path = ''

export default tabNavigator
