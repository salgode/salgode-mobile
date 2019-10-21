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
      email: '',
      password: '',
      inputValidity: true,
    }

    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
  }

  onChangeEmail(email) {
    const validity = email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    this.setState({ email, inputValidity: validity })
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  render() {
    return (
      <Form style={styles.form}>
        <Item inlineLabel regular style={styles.item}>
          <Label style={styles.label}>Email</Label>
          <Input
            style={styles.input}
            onChangeText={this.onChangeEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            value={this.state.email}
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
          onPress={() =>
            this.props.onSend(this.state.email, this.state.password)
          }
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
