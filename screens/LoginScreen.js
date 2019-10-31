import React, { Component } from 'react'
import { Text, Button, View } from 'native-base'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  Animated,
  Keyboard,
  AsyncStorage,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import PropTypes from 'prop-types'

import logo from '../assets/images/login_icon.png'

import LoginForm from '../components/Login/LoginForm'
import { loginUser } from '../redux/actions/user'

import lang from '../languages/es'

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
    const user = await this.props.login(email, password)
    this.setState({ loading: false })
    if (user.error) {
      Alert.alert('No se pudo iniciar sesión', 'Las credenciales ingresadas son incorrectas')
    } else {
      const { data } = user.payload
      AsyncStorage.setItem('@userToken', String(JSON.stringify(data.token)))
      AsyncStorage.setItem('@userId', String(JSON.stringify(data.userId)))
      this.props.navigation.navigate('ResolveUserScreen')
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
