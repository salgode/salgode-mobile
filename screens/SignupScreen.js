import React, { Component } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  AsyncStorage,
} from 'react-native'
import { connect } from 'react-redux'
import { View } from 'native-base'
import PropTypes from 'prop-types'

import { signupUser, uploadImageUser } from '../redux/actions/user'
import SignupForm from '../components/Login/SignupForm'

import lang from '../languages/es'
import { analytics, ANALYTICS_CATEGORIES } from '../utils/analytics'

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
    const selfieUrl = await this.props.uploadImage(userInfo.selfieLink)
    const frontIdUrl = await this.props.uploadImage(
      userInfo.identification_image_front
    )
    const backIdUrl = await this.props.uploadImage(
      userInfo.identification_image_back
    )
    const user = await this.props
      .signup(
        userInfo.name,
        userInfo.lastName,
        userInfo.email,
        userInfo.phone,
        userInfo.password,
        userInfo.passwordRepeat,
        selfieUrl,
        frontIdUrl,
        backIdUrl
      )
      .then(response => {
        return response
      })
    this.setState({ loading: false })
    if (user.error) {
      Alert.alert(lang.signup.error.title, lang.signup.error.message)
    } else {
      const { data } = user.payload
      AsyncStorage.setItem('@userToken', String(JSON.stringify(data.token)))
      AsyncStorage.setItem('@userId', String(JSON.stringify(data.userId)))
      analytics.newEvent(
        ANALYTICS_CATEGORIES.LogIn.name,
        ANALYTICS_CATEGORIES.LogIn.actions.SignUp,
        data.userId
      )
      this.props.navigation.navigate('ResolveUserScreen')
    }
  }

  render() {
    const { loading } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ScrollView>
          <View style={styles.container}>
            <SignupForm onSend={this.onSend} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

SignupScreen.propTypes = {
  uploadImage: PropTypes.func.isRequired,
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

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  uploadImage: img => dispatch(uploadImageUser(img)),
  signup: (
    name,
    lastName,
    email,
    phone,
    password,
    passwordRepeat,
    selfieLink,
    identification_image_front,
    identification_image_back
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
        passwordRepeat,
        selfieLink,
        identification_image_front,
        identification_image_back
        // driverLicenseLink,
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
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)
