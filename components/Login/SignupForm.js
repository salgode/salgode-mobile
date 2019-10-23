/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native'
import { Text, Form, Item, Input, Label, Button } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../../constants/Layout'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'

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
      selfieLink: '',
      hasCameraPermission: null,
      type: Camera.Constants.Type.front,
      onCamera: false,
      validity: {
        name: false,
        lastname: false,
        email: false,
        phoneNumber: false,
        password: false,
        passwordRepeat: false,
        selfieLink: false,
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
    this.getselfie = this.getselfie.bind(this)
    this.openCamera = this.openCamera.bind(this)
    this.closeCamera = this.closeCamera.bind(this)
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
    const validity = phoneNumber.match(/^(\+56)?\d{9}$/)
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
      this.state.validity.passwordRepeat &&
      this.state.validity.selfieLink
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
      selfieLink: this.state.selfieLink,
    })
  }

  async getselfie() {
    if (this.camera) {
      const photo = await this.camera.takePictureAsync({
        quality: 0.5,
        base64: true,
      })
      this.setState(oldState => ({
        selfieLink: photo.base64,
        validity: {
          ...oldState.validity,
          selfieLink: photo.base64 ? true : false,
        },
      }))
    }
    this.closeCamera()
  }

  openCamera() {
    this.setState({ onCamera: true })
  }

  closeCamera() {
    this.setState({ onCamera: false })
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({ hasCameraPermission: status === 'granted' })
  }

  render() {
    const { height, width } = Dimensions.get('window')
    return (
      <Form style={styles.form}>
        {this.state.hasCameraPermission && (
          <Modal
            animationType="slide"
            transparent={false}
            presentationStyle="fullScreen"
            visible={this.state.onCamera}
            onRequestClose={this.closeCamera}
          >
            <Camera
              style={{ width: width, height: height, position: 'absolute' }}
              type={this.state.type}
              ref={ref => {
                this.camera = ref
              }}
            >
              <View
                style={{
                  flex: 0.1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    })
                  }}
                >
                  <Button borderRadius={10} style={styles.icon}>
                    <Ionicons
                      name="md-reverse-camera"
                      color="white"
                      size={24}
                    />
                  </Button>
                </TouchableOpacity>
              </View>
            </Camera>
            <Button
              borderRadius={10}
              style={styles.buttonCamera}
              onPress={this.getselfie}
            >
              <Text>Tomar foto </Text>
            </Button>
          </Modal>
        )}
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
            keyboardType="phone-pad"
            value={this.state.phoneNumber}
            autoCompleteType="tel"
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
          onPress={this.openCamera}
        >
          <Text>Tomar selfie</Text>
        </Button>

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
const {height} = Dimensions.get('window')
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
  buttonCamera: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: height - 70,
  },
  form: {
    alignItems: 'center',
    margin: 15,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginTop: 20,
    width: 40,
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
