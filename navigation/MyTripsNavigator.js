import React from 'react'
import { createMaterialTopTabNavigator } from 'react-navigation'
import TripsScreen from '../screens/TripsScreen'

export default createMaterialTopTabNavigator(
  {
    Proximos: {
      screen: props => <TripsScreen {...props} />,
      navigationOptions: () => ({
        title: 'Próximos',
      }),
    },
    Pasados: {
      screen: props => <TripsScreen {...props} />,
      navigationOptions: () => ({
        title: 'Pasados',
      }),
    },
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)
