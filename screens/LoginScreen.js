import React, { Component } from 'react'
import { Text, Button, View, Spinner } from 'native-base'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Animated,
  Keyboard,
  Alert,
  ScrollView,
  AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import logo from '../assets/images/login_icon.png'

import LoginForm from '../components/Login/LoginForm'
import { loginUser } from '../redux/actions/user'

import lang from '../languages/es'
import { analytics, ANALYTICS_CATEGORIES } from '../utils/analytics'
import { registerForPushNotifications } from '../utils/notifications'

const window = Dimensions.get('window')
const IMAGE_HEIGHT = window.width / 1.5
const IMAGE_HEIGHT_SMALL = window.width / 5

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: lang.default.back,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.onSend = this.onSend.bind(this)
    this.onCreateAccountPress = this.onCreateAccountPress.bind(this)
    this.onRecoverPasswordPress = this.onRecoverPasswordPress.bind(this)
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT)
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    )
    this.keyboardWillHideSub = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    )
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event =>
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start()

  keyboardWillHide = event =>
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start()

  async onSend(email, password) {
    this.setState({ loading: true })
    const pushNotificationToken = await registerForPushNotifications()
    const user = await this.props.login(email, password, pushNotificationToken)
    this.setState({ loading: false })
    if (user.error) {
      Alert.alert(
        'No se pudo iniciar sesión',
        'Las credenciales ingresadas son incorrectas'
      )
    } else {
      const { data } = user.payload
      if (data.verifications.email) {
        AsyncStorage.setItem('@userToken', String(JSON.stringify(data.token)))
        AsyncStorage.setItem('@userId', String(JSON.stringify(data.userId)))
        this.props.navigation.navigate('ResolveUserScreen')
        analytics.newEvent(
          ANALYTICS_CATEGORIES.LogIn.name,
          ANALYTICS_CATEGORIES.LogIn.actions.LogIn,
          data.userId
        )
      } else {
        Alert.alert(
          'No has confirmado tu cuenta',
          'Por favor revisa el correo que te enviamos para verificar tu cuenta'
        )
      }
    }
  }

  onRecoverPasswordPress() {
    this.props.navigation.navigate('RecoverPassword')
  }

  onCreateAccountPress() {
    this.props.navigation.navigate('Signup')
  }

  render() {
    const { loading } = this.state
    return (
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <Animated.Image
            source={logo}
            style={[styles.logo, { height: this.imageHeight }]}
          />
          {!loading && <LoginForm onSend={this.onSend} />}
          {loading && <Spinner color="blue" />}
          {!loading && (
            <View>
              <Button transparent onPress={this.onCreateAccountPress}>
                <Text>{lang.signin.create}</Text>
              </Button>
              {/* <Button transparent onPress={this.onRecoverPasswordPress}>
                <Text>{lang.signin.forget}</Text>
              </Button> */}
            </View>
          )}
          {loading && <Text>{lang.signin.verifying}</Text>}
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    height: IMAGE_HEIGHT,
    marginBottom: 20,
    marginTop: 20,
    padding: 10,
    resizeMode: 'contain',
  },
})

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginUser(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
