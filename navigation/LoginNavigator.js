/* eslint-disable no-unused-vars*/
import { createStackNavigator } from 'react-navigation'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import RecoverPasswordScreen from '../screens/RecoverPasswordScreen';

export default createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    RecoverPassword: RecoverPasswordScreen, 
  },
  {
    navigationOptions: {
      header: null,
    },
  }
)
