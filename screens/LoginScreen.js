import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import PropTypes from 'prop-types'
import LoginForm from '../components/Login/LoginForm'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Text style={styles.title}>#Salgode</Text>
        <LoginForm />
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
