import { createMaterialTopTabNavigator } from 'react-navigation'
import MyTripsScreen from '../screens/MyTripsScreen'

export default createMaterialTopTabNavigator(
  {
    Pasados: {
      screen: MyTripsScreen,
      navigationOptions: () => ({
        title: 'Pasados',
      }),
    },
    Proximos: {
      screen: MyTripsScreen,
      navigationOptions: () => ({
        title: 'Próximos',
      }),
    },
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
  }
)
