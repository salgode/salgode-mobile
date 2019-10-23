import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import TripsScreen from '../screens/TripsScreen'
import Colors from '../constants/Colors'

export default createMaterialTopTabNavigator(
  {
    MisViajes: {
      screen: props => <TripsScreen isRequestedTrips={false} {...props} />,
      navigationOptions: () => ({
        tabBarOptions: {
          labelStyle: {
            fontWeight: 'bold',
          },
          activeTintColor: 'white',
          indicatorStyle: { backgroundColor: 'white' },
          style: {
            backgroundColor: Colors.mainGrey,
          },
        },
        title: 'Mis Viajes',
      }),
    },
    Pedidos: {
      screen: props => <TripsScreen isRequestedTrips {...props} />,
      navigationOptions: () => ({
        tabBarOptions: {
          labelStyle: {
            fontWeight: 'bold',
          },
          activeTintColor: 'white',
          indicatorStyle: { backgroundColor: 'white' },
          style: {
            backgroundColor: Colors.mainGrey,
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
