import { createStackNavigator } from 'react-navigation'

import { LoginScreen, RecoverPasswordScreen, SignupScreen } from '../screens'

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
