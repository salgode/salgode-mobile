/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Form, Item, Input, Label, Button, Spinner } from 'native-base'
import Layout from '../../constants/Layout'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import { withNavigation } from 'react-navigation'
import {
  formatPhone,
  maxLengthPhone,
  notWrongPhone,
  validPhone,
} from '../../utils/input'
import Legal from './Legal'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      lastname: '',
      modalVisible: false,
      email: '',
      phoneNumber: '',
      password: '',
      passwordRepeat: '',
      termsChecked: false,
      validity: {
        name: false,
        lastname: false,
        email: false,
        phoneNumber: false,
        password: false,
        passwordRepeat: false,
      },
    }

    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeLastname = this.onChangeLastname.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangePasswordRepeat = this.onChangePasswordRepeat.bind(this)
    this.formatPhoneCL = this.formatPhoneCL.bind(this)
    this.getValidity = this.getValidity.bind(this)
    this.onPress = this.onPress.bind(this)
  }

  onChangeName(name) {
    this.setState(oldState => ({
      name,
      validity: { ...oldState.validity, name: name.length > 2 },
    }))
  }

  onChangeLastname(lastname) {
    this.setState(oldState => ({
      lastname,
      validity: { ...oldState.validity, lastname: lastname.length > 2 },
    }))
  }

  onChangeEmail(email) {
    const validity = email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    this.setState(oldState => ({
      email,
      validity: { ...oldState.validity, email: !!validity },
    }))
  }

  onChangePhoneNumber(phoneNumber) {
    if (notWrongPhone(phoneNumber)) {
      const validity = validPhone(phoneNumber)
      this.setState(oldState => ({
        phoneNumber: formatPhone(phoneNumber),
        validity: { ...oldState.validity, phoneNumber: !!validity },
      }))
    }
  }

  onChangePassword(password) {
    this.setState(oldState => ({
      password,
      validity: { ...oldState.validity, password: password.length >= 8 },
    }))
  }

  onChangePasswordRepeat(password) {
    this.setState(oldState => ({
      passwordRepeat: password,
      validity: {
        ...oldState.validity,
        passwordRepeat: password.length >= 8 && password === this.state.password
      },
    }))
  }

  formatPhoneCL() {
    if (!/^\+56 9/g.test(this.state.phoneNumber)) {
      this.setState(oldState => ({ phoneNumber: '+56 9' }))
    }
  }

  getValidity() {
    const validity =
      this.state.validity.name &&
      this.state.validity.lastname &&
      this.state.validity.email &&
      this.state.validity.phoneNumber &&
      this.state.validity.password &&
      this.state.validity.passwordRepeat &&
      this.state.termsChecked
    return validity && this.state.password === this.state.passwordRepeat
  }

  onPress() {
    // this.props.onSend({
    //   name: this.state.name,
    //   lastName: this.state.lastname,
    //   email: this.state.email,
    //   phone: this.state.phoneNumber,
    //   password: this.state.password,
    //   passwordRepeat: this.state.passwordRepeat,
    // })
    this.props.navigation.navigate('SignupImages', {
      userData: {
        name: this.state.name,
        lastName: this.state.lastname,
        email: this.state.email,
        phone: this.state.phoneNumber,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat,
      },
    })
  }

  render() {
    const { loading } = this.props

    return (
      <Form style={styles.form}>
        <Item floatingLabel style={styles.item}>
          <Label
            style={{
              color:
                this.state.validity.name || !this.state.name
                  ? Colors.textGray
                  : 'red',
            }}
          >
            Nombre
          </Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangeName}
            value={this.state.name}
            autoCompleteType="name"
          />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label
            style={{
              color:
                this.state.validity.lastname || !this.state.lastname
                  ? Colors.textGray
                  : 'red',
            }}
          >
            Apellido
          </Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangeLastname}
            value={this.state.lastname}
          />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label
            style={{
              color:
                this.state.validity.email || !this.state.email
                  ? Colors.textGray
                  : 'red',
            }}
          >
            Email
          </Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangeEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            value={this.state.email}
            autoCompleteType="email"
          />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label
            style={{
              color:
                this.state.validity.phoneNumber || !this.state.phoneNumber
                  ? Colors.textGray
                  : 'red',
            }}
          >
            Número de Teléfono (9 dígitos)
          </Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangePhoneNumber}
            onFocus={this.formatPhoneCL}
            keyboardType="phone-pad"
            maxLength={maxLengthPhone(this.state.phoneNumber)}
            value={this.state.phoneNumber}
          />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label
            style={{
              color:
                this.state.validity.password || !this.state.password
                  ? Colors.textGray
                  : 'red',
            }}
          >
            Clave
          </Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangePassword}
            secureTextEntry
            value={this.state.password}
          />
        </Item>
        <Item floatingLabel style={styles.item}>
          <Label
            style={{
              color:
                this.state.validity.passwordRepeat || !this.state.passwordRepeat
                  ? Colors.textGray
                  : 'red',
            }}
          >
            Confirma Tu Clave
          </Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangePasswordRepeat}
            secureTextEntry
            value={this.state.passwordRepeat}
          />
        </Item>

        <View>
          <Legal
            termsChecked={this.state.termsChecked}
            setTermsChecked={
              () => this.setState({ termsChecked: !this.state.termsChecked })
            }
          />
        </View>

        {loading && <Spinner color={'#0000FF'} />}
        {!loading && (
          <Button
            block
            borderRadius={10}
            style={styles.button}
            disabled={!this.getValidity()}
            onPress={this.onPress}
          >
            <Text>Siguiente</Text>
          </Button>
        )}
      </Form>
    )
  }
}

SignupForm.propTypes = {
  onSend: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  form: {
    alignItems: 'center',
    margin: 15,
  },
  input: {
    width: Layout.window.width * 0.85,
  },
  item: {
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
})

export default withNavigation(SignupForm)
