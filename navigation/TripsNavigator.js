import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import TripsScreen from '../screens/TripsScreen'
import Colors from '../constants/Colors'

export default createMaterialTopTabNavigator(
  {
    Pedidos: {
      screen: props => (
        <TripsScreen type={'pedidos'} isRequestedTrips {...props} />
      ),
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
        title: '#DePasajero',
      }),
      params: { asDriver: false },
    },
    MisViajes: {
      screen: props => (
        <TripsScreen type={'misviajes'} isRequestedTrips={false} {...props} />
      ),
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
        title: '#Conduciendo',
      }),
      params: { asDriver: true },
    },
  },
  {
    navigationOptions: () => ({
      title: 'Mis Viajes',
    }),
  }
)
