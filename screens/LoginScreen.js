import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import LoginForm from '../components/Login/LoginForm'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>#Salgode</Text>
        <LoginForm />
      </View>
    )
  }
}

LoginScreen.propTypes = {}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 50,
    fontWeight: '900',
  },
})

export default LoginScreen
