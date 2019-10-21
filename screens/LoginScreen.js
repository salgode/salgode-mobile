import React, { Component } from 'react'
import { Text, Button } from 'native-base'
import { StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import PropTypes from 'prop-types'
import LoginForm from '../components/Login/LoginForm'
import { loginUser } from '../redux/actions/user'

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
      return response.payload.data
    })
    if (!user) {
      Alert.alert(
        'Hubo un problema iniciando sesión. Por favor intentalo de nuevo.'
      )
    } else if (!user.email) {
      Alert.alert(
        'Las credenciales ingresadas son inválidas. Por favor intentalo de nuevo.'
      )
    } else {
      this.props.navigation.navigate('Home')
    }
    await this.setState({ loading: false })
  }

  onCreateAccountPress() {
    this.props.navigation.navigate('Signup')
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Text style={styles.title}>#Salgode</Text>
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
  title: {
    fontSize: 50,
    fontWeight: '900',
  },
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(loginUser(email, password)),
})

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen)
