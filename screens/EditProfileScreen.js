import React from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
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
import { MaterialCommunityIcons } from '@expo/vector-icons'
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
  return /^[- A-Za-z()ÁÉÍÓÚÑÜáéíóúñü]+$/g.test(str)
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
  return /^[- A-Za-z\d()ÁÉÍÓÚÑÜáéíóúñü]+$/g.test(str)
}

function validateModel(str) {
  return validateBrand(str)
}

const Field = props => {
  const { field } = props
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
      />
      {validity === 'valid' ? (
        <Icon name="checkmark-circle" />
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
  }).isRequired,
}

const EditProfileScreen = () => {
  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [hasCar, setHasCar] = React.useState(false)
  const [carPlate, setCarPlate] = React.useState('BC2019')
  const [carColor, setCarColor] = React.useState('Gris')
  const [carBrand, setCarBrand] = React.useState('Nissan')
  const [carModel, setCarModel] = React.useState('Sportage')

  const [isLoading, setIsLoading] = React.useState(true)
  const [loadErr, setLoadErr] = React.useState(null)

  const [isSaving, setIsSaving] = React.useState(false)
  const [saveErr, setSaveErr] = React.useState(null)

  const commonFields = [
    { label: 'Nombre', value: name, setValue: setName, validate: validateName },
    {
      label: 'Apellido',
      value: lastName,
      setValue: setLastName,
      validate: validateName,
    },
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
    car: hasCar
      ? {
          plate: carPlate,
          color: carColor,
          brand: carBrand,
          model: carModel,
        }
      : null,
  }

  const isValidUser = [...commonFields, ...carFields].every(field =>
    field.validate(field.value)
  )

  React.useEffect(() => {
    const loadUser = async () => {
      // TODO: remove this and load user from backend
      return await new Promise(resolve => {
        const hardcodedUser = {
          name: 'Juan',
          lastName: 'Pérez',
          car: {
            plate: 'BC2019',
            color: 'Gris',
            brand: 'Nissan',
            model: 'Sportage',
          },
        }
        const hardcodedTimeout = 1000
        setTimeout(() => resolve(hardcodedUser), hardcodedTimeout)
      })
    }

    loadUser()
      .then(user => {
        setName(user.name)
        setLastName(user.lastName)
        if (user.car != null) {
          setCarPlate(user.car.plate)
          setCarColor(user.car.color)
          setCarBrand(user.car.brand)
          setCarModel(user.car.model)
        }

        setIsLoading(false)
      })
      .catch(err => {
        setLoadErr(err)
        setIsLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (saveErr != null) {
      Alert.alert(
        'Error al cargar usuario',
        JSON.stringify(loadErr, null, '  ')
      )
    }
  }, [loadErr])

  const onPressSaveProfile = React.useCallback(() => {
    const saveProfile = async () => {
      // TODO: remove this and send `user` to backend here
      Alert.alert(
        'No implementado',
        'user = ' + JSON.stringify(user, null, '  ')
      )
    }

    setIsSaving(true)
    saveProfile()
      .then(() => setIsSaving(false))
      .catch(err => {
        setSaveErr(err)
        setIsSaving(false)
      })
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
                  <Text style={styles.readonlyFieldText}>+56976543210</Text>
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
              <View style={styles.rowCenter}>
                <CheckBox
                  color={Colors.textGray}
                  checked={hasCar}
                  onPress={() => setHasCar(!hasCar)}
                />
                <Text style={styles.checkboxLabel}>Auto</Text>
              </View>
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
                style={styles.blueButton}
                disabled={isSaving || !isValidUser}
                onPress={onPressSaveProfile}
              >
                <Text style={styles.buttonText}> Guardar cambios</Text>
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
export default EditProfileScreen

const photoSize = 96

const styles = StyleSheet.create({
  artificialKeyboardPadding: { height: 128 },
  blueButton: {
    backgroundColor: '#0000FF',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
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
    color: Colors.textGray,
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
  row: {
    flexDirection: 'row',
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
