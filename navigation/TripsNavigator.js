import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import TripsScreen from '../screens/TripsScreen'

export default createMaterialTopTabNavigator(
  {
    MisViajes: {
      screen: props => <TripsScreen isRequestedTrips={false} {...props} />,
      navigationOptions: () => ({
        tabBarOptions: {
          activeTintColor: 'white',
          indicatorStyle: { backgroundColor: 'white' },
          style: {
            backgroundColor: 'black',
          },
        },
        title: 'Mis Viajes',
      }),
    },
    Pedidos: {
      screen: props => <TripsScreen isRequestedTrips {...props} />,
      navigationOptions: () => ({
        tabBarOptions: {
          activeTintColor: 'white',
          indicatorStyle: { backgroundColor: 'white' },
          style: {
            backgroundColor: 'black',
          },
        },
        title: 'Pedidos',
      }),
    },
  },
  {
    navigationOptions: () => ({
      title: 'Viajes',
    }),
  }
)
