import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Form, Item, Input, Label, Button } from 'native-base'
import Layout from '../../constants/Layout'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '+56',
      password: '',
      inputValidity: true,
    }

    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
  }

  onChangePhoneNumber(phoneNumber) {
    const validity = phoneNumber.match(/^(\+56)?\d{9}$/)
    this.setState({ phoneNumber, inputValidity: !!validity })
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  render() {
    return (
      <Form style={styles.form}>
        <Item inlineLabel regular style={styles.item}>
          <Label style={styles.label}>Celular</Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangePhoneNumber}
            keyboardType="phone-pad"
            value={this.state.phoneNumber}
          />
        </Item>
        <Item inlineLabel last regular style={styles.item}>
          <Label style={styles.label}>Clave</Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangePassword}
            secureTextEntry
            value={this.state.password}
          />
        </Item>
        <Button
          block
          borderRadius={10}
          style={styles.button}
          disabled={!this.state.inputValidity}
          onPress={this.props.onSend}
        >
          <Text>Entrar</Text>
        </Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  onSend: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  form: {
    alignItems: 'center',
    height: 250,
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
  label: {
    color: Colors.textGray,
  },
})

export default LoginForm
