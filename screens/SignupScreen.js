import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Spinner, View } from 'native-base'
import PropTypes from 'prop-types'
import { signupUser } from '../redux/actions/user'
import SignupForm from '../components/Login/SignupForm'

class SignupScreen extends Component {
  static navigationOptions = {
    title: 'Registro',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.onSend = this.onSend.bind(this)
  }

  async onSend(userInfo) {
    this.setState({ loading: true })
    const user = await this.props
      .signup(
        userInfo.name,
        userInfo.lastName,
        userInfo.email,
        userInfo.phone,
        userInfo.password,
        userInfo.passwordRepeat
      )
      .then(response => {
        return response
      })
    this.setState({ loading: false })

    console.log(user)
    if (
      user.error ||
      !user.payload.data.user ||
      !user.payload.data.user.email
    ) {
      alert('Hubo un problema registrandote. Por favor intentalo de nuevo.')
    } else {
      console.log('Exito')
      this.props.navigation.navigate('Trips')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
          <View style={styles.container}>
            {this.state.loading && <Spinner />}
            <SignupForm onSend={this.onSend} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

SignupScreen.propTypes = {
  signup: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
})

const mapDispatchToProps = dispatch => ({
  signup: (
    name,
    lastName,
    email,
    phone,
    password,
    passwordRepeat
    // selfieLink,
    // driverLicenseLink,
    // dniLink,
    // carPlate,
    // carColor,
    // carBrand,
    // carModel
  ) =>
    dispatch(
      signupUser(
        name,
        lastName,
        email,
        phone,
        password,
        passwordRepeat
        // selfieLink,
        // driverLicenseLink,
        // dniLink,
        // carPlate,
        // carColor,
        // carBrand,
        // carModel
      )
    ),
})

export default connect(
  null,
  mapDispatchToProps
)(SignupScreen)
