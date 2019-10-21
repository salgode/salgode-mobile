import React, { Component } from 'react'
import { Text, Button } from 'native-base'
import ScaledImage from 'react-native-scaled-image'
import styled from 'styled-components'
import { StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import PropTypes from 'prop-types'
import LoginForm from '../components/Login/LoginForm'
import { loginUser } from '../redux/actions/user'

const logo = require('../assets/images/login_icon.png')
class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.onSend = this.onSend.bind(this)
    this.onCreateAccountPress = this.onCreateAccountPress.bind(this)
  }

  async onSend(email, password) {
    this.setState({ loading: true })

    const user = await this.props.login(email, password).then(response => {
      return response
    })

    this.setState({ loading: false })

    if (user.error) {
      Alert.alert(
        'Hubo un problema iniciando sesión. Por favor intentalo de nuevo.'
      )
    } else {
      this.props.navigation.navigate('Trips')
    }
  }

  onCreateAccountPress() {
    this.props.navigation.navigate('Signup')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <SalgoDeLogo source={logo} height={160} />
        <LoginForm onSend={this.onSend} />
        <Button transparent onPress={this.onCreateAccountPress}>
          <Text>No tienes una cuenta? Crea una aquí</Text>
        </Button>
        {this.state.loading && <Spinner />}
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
    justifyContent: 'space-evenly',
    ...StyleSheet.absoluteFillObject,
  },
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginUser(email, password)),
})

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen)

const SalgoDeLogo = styled(ScaledImage)`
  margin-right: auto;
  margin-left: auto;
`
