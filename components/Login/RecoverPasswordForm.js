import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Form, Button, Input, Item } from 'native-base'

import Layout from '../../constants/Layout'

class RecoverPasswordForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      inputValidity: false, //input vacio al inicio
    }

    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    if (this.state.inputValidity) {
      //if is a valid email (regex checked)
      //check that the email is in the data and
      //send email notification to recover password
      //console.log("Notification sent with email:", this.state.email)
    }
  }

  onChangeEmail(email) {
    //validation taken from login form
    const validity = email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    this.setState({ email, inputValidity: validity })
  }

  render() {
    return (
      <Form style={styles.form}>
        <Item inlineLabel regular style={styles.item}>
          <Input
            placeholder="Email de tu cuenta"
            style={styles.input}
            keyBoardType="email-address"
            autoCapitalize="none"
            autoCompleteType="email"
            onChangeText={this.onChangeEmail}
            value={this.state.email}
          />
        </Item>
        <Button block style={styles.button} onPress={this.onPress()}>
          <Text>Enviar link de recuperación</Text>
        </Button>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0000FF',
    borderRadius: 10,
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
})

export default RecoverPasswordForm
