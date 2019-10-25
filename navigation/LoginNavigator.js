import { createStackNavigator } from 'react-navigation'

import { LoginScreen, RecoverPasswordScreen, SignupScreen } from '../screens'
import ImageSignupForm from '../components/Login/ImageSignupForm'

export default createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    SignupImages: ImageSignupForm,
    RecoverPassword: RecoverPasswordScreen,
  },
  {
    navigationOptions: {
      header: null,
    },
  }
)
