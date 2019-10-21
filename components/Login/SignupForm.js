/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Form, Item, Input, Label, Button } from 'native-base'
import Layout from '../../constants/Layout'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'

class SignupForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      lastname: '',
      email: '',
      phoneNumber: '',
      password: '',
      passwordRepeat: '',
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
    const validity = phoneNumber.match(/(\+56)?\d{9}/)
    this.setState(oldState => ({
      phoneNumber,
      validity: { ...oldState.validity, phoneNumber: !!validity },
    }))
  }

  onChangePassword(password) {
    this.setState(oldState => ({
      password,
      validity: { ...oldState.validity, password: password.length > 3 },
    }))
  }

  onChangePasswordRepeat(password) {
    this.setState(oldState => ({
      passwordRepeat: password,
      validity: { ...oldState.validity, passwordRepeat: password.length > 3 },
    }))
  }

  getValidity() {
    const validity =
      this.state.validity.name &&
      this.state.validity.lastname &&
      this.state.validity.email &&
      this.state.validity.phoneNumber &&
      this.state.validity.password &&
      this.state.validity.passwordRepeat
    return validity && this.state.password === this.state.passwordRepeat
  }

  onPress() {
    this.props.onSend({
      name: this.state.name,
      lastName: this.state.lastname,
      email: this.state.email,
      phone: this.state.phoneNumber,
      password: this.state.password,
      passwordRepeat: this.state.passwordRepeat,
    })
  }

  render() {
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
            Número de Teléfono
          </Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangePhoneNumber}
            keyboardType="phone-pad"
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
        <Item floatingLabel last style={styles.item}>
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
        <Button
          block
          borderRadius={10}
          style={styles.button}
          disabled={!this.getValidity()}
          onPress={this.onPress}
        >
          <Text>Siguiente</Text>
        </Button>
      </Form>
    )
  }
}

SignupForm.propTypes = {
  onSend: PropTypes.func.isRequired,
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

export default SignupForm
