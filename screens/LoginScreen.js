import React, { Component } from 'react'
import { Text, Button } from 'native-base'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  Dimensions,
  Animated,
  Keyboard,
} from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import PropTypes from 'prop-types'
import LoginForm from '../components/Login/LoginForm'
import { loginUser } from '../redux/actions/user'

const window = Dimensions.get('window')
export const IMAGE_HEIGHT = window.width / 1.5
export const IMAGE_HEIGHT_SMALL = window.width / 5

const logo = require('../assets/images/login_icon.png')
class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
    headerBackTitle: 'Atrás',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.onSend = this.onSend.bind(this)
    this.onCreateAccountPress = this.onCreateAccountPress.bind(this)
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

  keyboardWillShow = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start()
  }

  keyboardWillHide = event => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start()
  }

  async onSend(email, password) {
    this.setState({ loading: true })

    const user = await this.props.login(email, password).then(response => {
      return response
    })
    this.setState({ loading: false })

    if (user.error || !user.payload.data.email) {
      Alert.alert(
        'Hubo un problema iniciando sesión. Por favor intentalo de nuevo.'
      )
    } else {
      this.props.navigation.navigate('Main')
    }
  }

  onCreateAccountPress() {
    this.props.navigation.navigate('Signup')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Animated.Image
          source={logo}
          style={[styles.logo, { height: this.imageHeight }]}
        />
        {!this.state.loading && <LoginForm onSend={this.onSend} />}
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <Button transparent onPress={this.onCreateAccountPress}>
            <Text>No tienes una cuenta? Crea una aquí</Text>
          </Button>
        )}
        {this.state.loading && <Text>Comprobando datos</Text>}
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

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginUser(email, password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
