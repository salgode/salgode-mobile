import React, { Component } from 'react'
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import PropTypes from 'prop-types'
import LoginForm from '../components/Login/LoginForm'

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)

    this.onFormSend = this.onFormSend.bind(this)
  }

  onFormSend() {
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Text style={styles.title}>#Salgode</Text>
        <LoginForm onSend={this.onFormSend} />
      </KeyboardAvoidingView>
    )
  }
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

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
