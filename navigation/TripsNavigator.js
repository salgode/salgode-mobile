import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import TripsScreen from '../screens/TripsScreen'

export default createMaterialTopTabNavigator(
  {
    Disponibles: {
      screen: props => <TripsScreen isRequestedTrips={false} {...props} />,
      navigationOptions: () => ({
        title: 'Disponibles',
      }),
    },
    Pedidos: {
      screen: props => <TripsScreen isRequestedTrips {...props} />,
      navigationOptions: () => ({
        title: 'Pedidos',
      }),
    },
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)
