import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Form, Item, Input, Label, Button } from 'native-base'
import Layout from '../../constants/Layout'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      password: '',
    }

    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this)
  }

  onChangePhoneNumber(phoneNumber) {
    this.setState({ phoneNumber })
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  render() {
    return (
      <Form style={styles.form}>
        <Item inlineLabel regular style={styles.item}>
          <Label style={styles.label}>Celular</Label>
          <Input style={styles.input} onChangeText={this.onChangePhoneNumber} />
        </Item>
        <Item inlineLabel last regular style={styles.item}>
          <Label style={styles.label}>Clave</Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangePassword}
            secureTextEntry
          />
        </Item>
        <Button block borderRadius={10} style={styles.button}>
          <Text>Entrar</Text>
        </Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {}

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
    textAlign: 'right',
    width: Layout.window.width * 0.85,
  },
  item: {
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    color: '#8c8c8c',
  },
})

export default LoginForm
