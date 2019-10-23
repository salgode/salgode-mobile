import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import {
  Button,
  Form,
  Input,
  Item,
  Label,
  Text,
  Content,
  View,
  Icon,
  CheckBox,
} from 'native-base'
import { withNavigation } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { updateUser, signoutUser } from '../redux/actions/user'
import Layout from '../constants/Layout'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'

function validateName(str) {
  if (typeof str !== 'string') {
    return false
  }
  str = str.trim()

  if (str.length < 'Ana'.length) {
    return false
  }
  if (str.length >= 256) {
    return false
  }

  // letters, dash, space
  return /^[- A-Za-zÁÉÍÓÚÑÜáéíóúñü]+$/g.test(str)
}

function validatePlate(str) {
  if (typeof str !== 'string') {
    return false
  }
  str = str.trim()

  // old format: XX1234
  let firstLetter = 'ABCEFGHDKLNPRSTUVXYZWM'
  let secondLetter = 'ABCDEFGHIJKLNPRSTUVXYZW'
  firstLetter = '[' + firstLetter + firstLetter.toLowerCase() + ']'
  secondLetter = '[' + secondLetter + secondLetter.toLowerCase() + ']'
  const oldFormat = new RegExp(
    '^' + firstLetter + secondLetter + '[1-9][0-9][0-9][0-9]$',
    'g'
  )

  // new format: XXXX12
  const whitelist = 'BCDFGHJKLPRSTVWXYZ'
  const letter = '[' + whitelist + whitelist.toLowerCase() + ']'
  const newFormat = new RegExp(
    '^' + letter + letter + letter + letter + '[1-9][0-9]$',
    'g'
  )

  return oldFormat.test(str) || newFormat.test(str)
}

function validateColor(str) {
  if (typeof str !== 'string') {
    return false
  }
  str = str.trim()

  if (str.length < 'azul'.length) {
    return false
  }
  if (str.length >= 256) {
    return false
  }

  // letters, dash, space, parenthesis
  return /^[- A-Za-z()ÁÉÍÓÚÑÜáéíóúñü]+$/g.test(str) || str === ''
}

function validateBrand(str) {
  if (typeof str !== 'string') {
    return false
  }
  str = str.trim()

  if (str.length < 'BMW'.length) {
    return false
  }
  if (str.length >= 256) {
    return false
  }

  // letters, numbers, dash, space, parenthesis
  return /^[- A-Za-z\d()ÁÉÍÓÚÑÜáéíóúñü]+$/g.test(str) || str === ''
}

function validateModel(str) {
  return validateBrand(str)
}

const Field = ({ field }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [hasBeenBlurred, setHasBeenBlurred] = React.useState(false)

  const validity = field.validate(field.value)
    ? 'valid'
    : isEditing
    ? 'partial'
    : hasBeenBlurred
    ? 'invalid'
    : 'partial'

  return (
    <Item
      key={field.label}
      inlineLabel
      regular
      style={styles.item}
      success={validity === 'valid'}
      error={validity === 'invalid'}
    >
      <Label style={styles.label}>{field.label}</Label>
      <Input
        style={styles.input}
        onChangeText={value => {
          field.setValue(value)
          setIsEditing(true)
        }}
        onEndEditing={() => {
          setIsEditing(false)
          setHasBeenBlurred(true)
        }}
        value={field.value}
        secureTextEntry={field.isSecure}
        keyboardType={field.keyboardType || 'default'}
      />
      {validity === 'valid' ? (
        <Icon name="checkmark-circle" style={styles.checkMark} />
      ) : validity === 'invalid' ? (
        <Icon name="close-circle" />
      ) : null}
    </Item>
  )
}
Field.propTypes = {
  field: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    isSecure: PropTypes.bool,
    keyboardType: PropTypes.oneOf([
      'default',
      'number-pad',
      'decimal-pad',
      'numeric',
      'email-address',
      'phone-pad',
    ]),
  }).isRequired,
}

const EditProfileScreen = props => {
  const { navigation } = props

  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  // const [password, setPassword] = React.useState('')
  const [hasCar, setHasCar] = React.useState(!!props.user.car)
  const [carPlate, setCarPlate] = React.useState('BC2019')
  const [carColor, setCarColor] = React.useState('Gris')
  const [carBrand, setCarBrand] = React.useState('Nissan')
  const [carModel, setCarModel] = React.useState('Sportage')

  const [isLoading, setIsLoading] = React.useState(true)
  // eslint-disable-next-line no-unused-vars
  const [loadErr, setLoadErr] = React.useState(null)

  // eslint-disable-next-line no-unused-vars
  const [isSaving, setIsSaving] = React.useState(false)
  // eslint-disable-next-line no-unused-vars
  const [saveErr, setSaveErr] = React.useState(null)

  const commonFields = [
    { label: 'Nombre', value: name, setValue: setName, validate: validateName },
    {
      label: 'Apellido',
      value: lastName,
      setValue: setLastName,
      validate: validateName,
    },
    {
      label: 'Teléfono',
      value: phone,
      setValue: setPhone,
      validate: phone => phone.match(/^(\+56)?\d{9}$/),
      keyboardType: 'phone-pad',
    },
    // {
    //   label: 'Contraseña',
    //   value: password,
    //   setValue: setPassword,
    //   validate: pass => typeof pass === 'string' && pass.length > 3,
    //   isSecure: true,
    // },
  ]
  const carFields = [
    {
      label: 'Patente',
      value: carPlate,
      setValue: setCarPlate,
      validate: validatePlate,
    },
    {
      label: 'Color',
      value: carColor,
      setValue: setCarColor,
      validate: validateColor,
    },
    {
      label: 'Marca',
      value: carBrand,
      setValue: setCarBrand,
      validate: validateBrand,
    },
    {
      label: 'Modelo',
      value: carModel,
      setValue: setCarModel,
      validate: validateModel,
    },
  ]

  const user = {
    name,
    lastName,
    phone,
    car: {
      plate: carPlate,
      color: carColor,
      brand: carBrand,
      model: carModel,
    },
  }

  const isValidUser = () => {
    const isCarValid =
      !hasCar ||
      (validateBrand(user.car.brand) &&
        validateColor(user.car.color) &&
        validateModel(user.car.model) &&
        validatePlate(user.car.plate))
    const validFields = [...commonFields].every(field =>
      field.validate(field.value)
    )

    return isCarValid && validFields
  }

  React.useEffect(() => {
    // console.log(props.user)
    const stateUser = props.user
    const user = {
      name: stateUser.name,
      lastName: stateUser.lastName,
      phone: stateUser.phone,
    }

    if (stateUser.car) {
      user.car = {
        plate: stateUser.car.plate,
        color: stateUser.car.color,
        brand: stateUser.car.brand,
        model: stateUser.car.model,
      }
    } else {
      user.car = {
        plate: '',
        color: '',
        brand: '',
        model: '',
      }
    }

    setName(user.name)
    setLastName(user.lastName)
    setPhone(user.phone)
    setCarPlate(user.car.plate)
    setCarColor(user.car.color)
    setCarBrand(user.car.brand)
    setCarModel(user.car.model)

    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    if (saveErr != null) {
      Alert.alert(
        'Error al cargar usuario',
        JSON.stringify(loadErr, null, '  ')
      )
    }
  }, [loadErr])

  const saveUser = async () => {
    setIsLoading(true)
    const response = await props.updateUser(
      user.name,
      user.lastName,
      // props.user.email,
      user.phone,
      user.car,
      props.user.userId,
      props.user.token
    )
    setIsLoading(false)
    // console.log(response)
    if (response.error) {
      alert(
        'Hubo un problema actualizando tu informacion. Por favor intentalo de nuevo.'
      )
    } else {
      alert('Informacion actualizada con exito')
    }
  }

  const onPressSaveProfile = React.useCallback(() => {
    saveUser()
  }, [user])

  React.useEffect(() => {
    if (saveErr != null) {
      Alert.alert(
        'Error al guardar perfil',
        JSON.stringify(saveErr, null, '  ')
      )
    }
  }, [saveErr])

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue" marginTop={20} />
      </View>
    )
  }

  const signOut = () => {
    props.signOut()
    navigation.navigate('LoginStack')
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.flex1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content>
          <View style={{ minHeight: Dimensions.get('window').height }}>
            <View style={styles.row}>
              <View style={styles.profilePhoto}>
                <MaterialCommunityIcons
                  name="face-profile"
                  color="gray"
                  size={photoSize}
                />
              </View>
              <View style={styles.readonlyFieldsContainer}>
                <View style={styles.readonlyField}>
                  <Text style={[styles.label, styles.readonlyFieldText]}>
                    Celular
                  </Text>
                  <Text style={styles.readonlyFieldText}>{phone}</Text>
                </View>
                <Button
                  small
                  block
                  borderRadius={10}
                  style={styles.button}
                  disabled={true}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonText}>Cambiar contraseña</Text>
                </Button>
              </View>
            </View>
            <Form style={styles.form}>
              {commonFields.map(field => (
                <Field key={field.label} field={field} validity="partial" />
              ))}
              <TouchableOpacity
                style={styles.rowCenter}
                onPress={() => setHasCar(!hasCar)}
              >
                <CheckBox
                  color={Colors.textGray}
                  checked={hasCar}
                  onPress={() => setHasCar(!hasCar)}
                />
                <Text style={styles.checkboxLabel}>Tengo Auto</Text>
              </TouchableOpacity>
              {hasCar ? (
                <>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Datos auto</Text>
                  </View>
                  {carFields.map(field => (
                    <Field key={field.label} field={field} validity="partial" />
                  ))}
                </>
              ) : null}
              <Button
                block
                borderRadius={10}
                color="#0000FF"
                style={styles.blueButton}
                disabled={isSaving || !isValidUser()}
                onPress={onPressSaveProfile}
              >
                <Text style={styles.buttonText}> Guardar cambios</Text>
              </Button>
              <Button
                block
                borderRadius={10}
                color="#FF5242"
                style={styles.redButton}
                disabled={isSaving || !isValidUser}
                onPress={() => signOut()}
              >
                <Text>Cerrar Sesión</Text>
              </Button>
            </Form>
          </View>
          <View style={styles.artificialKeyboardPadding} />
        </Content>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

EditProfileScreen.navigationOptions = {
  title: 'Editar perfil',
}

EditProfileScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    car: PropTypes.shape({
      plate: PropTypes.string,
      color: PropTypes.string,
      brand: PropTypes.string,
      model: PropTypes.string,
    }),
  }),
  updateUser: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

const mapPropsToState = state => ({
  user: state.user,
})

const mapDispatchToState = dispatch => ({
  updateUser: (name, lastName, email, phone, password, car, id, authToken) =>
    dispatch(
      updateUser(name, lastName, email, phone, password, car, id, authToken)
    ),
  signOut: () => dispatch(signoutUser()),
})

export default connect(
  mapPropsToState,
  mapDispatchToState
)(withNavigation(EditProfileScreen))

const photoSize = 96

const styles = StyleSheet.create({
  artificialKeyboardPadding: { height: 128 },
  blueButton: {
    // backgroundColor: '#0000FF',
    marginTop: 30,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
  },
  checkMark: {
    color: '#33C534',
  },
  checkboxLabel: {
    color: Colors.textGray,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 15,
  },
  flex1: {
    flex: 1,
  },
  form: {
    alignItems: 'center',
    height: 250,
    margin: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginLeft: 5,
  },
  headerTextContainer: { alignSelf: 'flex-start', marginTop: 10 },
  input: {
    fontSize: 14,
    height: 40,
    width: Layout.window.width * 0.85,
  },
  item: {
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    color: '#8c8c8c',
    fontSize: 14,
  },
  profilePhoto: {
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: photoSize / 2,
    borderWidth: 1,
    height: photoSize,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 16,
    width: photoSize,
  },
  readonlyField: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  readonlyFieldText: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
  readonlyFieldsContainer: {
    marginTop: 20,
    paddingHorizontal: 12,
  },
  redButton: {
    // backgroundColor: '#FF5242',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
