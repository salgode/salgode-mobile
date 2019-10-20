import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import PropTypes from 'prop-types'
import LoginForm from '../components/Login/LoginForm'
import { loginAsync } from '../utils/login'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.onSend = this.onSend.bind(this)
  }

  async onSend(email, password) {
    const user = await loginAsync(email, password)
    console.log(user)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Text style={styles.title}>#Salgode</Text>
        <LoginForm onSend={this.onSend} />
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 50,
    fontWeight: '900',
  },
})

export default LoginScreen
