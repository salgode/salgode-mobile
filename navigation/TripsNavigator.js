import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import TripsScreen from '../screens/TripsScreen'

export default createMaterialTopTabNavigator(
  {
    Realizados: {
      screen: props => <TripsScreen isRequestedTrips {...props} />,
      navigationOptions: () => ({
        title: 'Realizados',
      }),
    },
    Pedidos: {
      screen: props => <TripsScreen isRequestedTrips={false} {...props} />,
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
