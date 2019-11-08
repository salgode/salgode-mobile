import React from 'react'
import Constants from 'expo-constants'
import { Entypo, Octicons } from '@expo/vector-icons'
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  Modal,
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
  Thumbnail,
  H2,
  Spinner,
} from 'native-base'
import { withNavigation } from 'react-navigation'
import * as Permissions from 'expo-permissions'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import {
  updateUser,
  signoutUser,
  getUserCar,
  getImageUrl,
  createVehicle,
} from '../redux/actions/user'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import PhotoTaker from '../components/Login/PhotoTaker'
import {
  formatPhone,
  maxLengthPhone,
  notWrongPhone,
  validPhone,
  notWrongPlate,
} from '../utils/input'
import { uploadImageToS3 } from '../utils/image'
import * as ImagePicker from 'expo-image-picker'

function validateName(str) {
  if (typeof str !== 'string') {
    return false
  }
  str = str.trim()

  if (str.length < 'Al'.length) {
    return false
  }
  if (str.length >= 256) {
    return false
  }

  // letters, dash, space
  return /^[ A-Za-zÁÉÍÓÚÑÜáéíóúñü]+$/g.test(str)
}

function validatePlate(str) {
  if (typeof str !== 'string') {
    return false
  }
  str = str.trim()

  const pattern = new RegExp('\\b([A-Z]{2}([A-Z]|[0-9]){2}[0-9]{2})\\b', 'gi')

  return pattern.test(str)
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
      style={{
        ...styles.item,
        backgroundColor:
          field.editable !== undefined && !field.editable ? '#C0C0C0' : '#FFF',
      }}
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
        placeholder={field.placeholder}
        secureTextEntry={field.isSecure}
        keyboardType={field.keyboardType || 'default'}
        maxLength={field.maxLength ? field.maxLength(field.value) : undefined}
        editable={field.editable}
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
    maxLength: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    editable: PropTypes.bool,
    validate: PropTypes.func.isRequired,
    isSecure: PropTypes.bool,
    editable: PropTypes.bool,
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
  // const { navigation } = props

  const [name, setName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [isChangePasswordActive, setIsChangePasswordActive] = React.useState(
    false
  )
  const [currentPassword, setCurrentPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [hasCar, setHasCar] = React.useState(false)
  const [gettingCar, setGettingCar] = React.useState(false)
  const [carPlate, setCarPlate] = React.useState('')
  const [carColor, setCarColor] = React.useState('')
  const [carBrand, setCarBrand] = React.useState('')
  const [carModel, setCarModel] = React.useState('')
  const [avatar, setAvatar] = React.useState(props.user.avatar)

  const [isLoading, setIsLoading] = React.useState(true)
  // eslint-disable-next-line no-unused-vars
  const [loadErr, setLoadErr] = React.useState(null)

  // eslint-disable-next-line no-unused-vars
  const [isSaving, setIsSaving] = React.useState(false)
  // eslint-disable-next-line no-unused-vars
  const [saveErr, setSaveErr] = React.useState(null)
  const [destination, setDestination] = React.useState('dniFront')

  // TODO: minimal state
  // DNI Identification
  const [dniFront, setDniFront] = React.useState(
    props.user.dni && props.user.dni.front
  )
  const [dniFrontSubmit, setDniFrontSubmit] = React.useState('')
  const [dniBack, setDniBack] = React.useState(
    props.user.dni && props.user.dni.back
  )
  const [dniBackSubmit, setDniBackSubmit] = React.useState('')
  const [isUploadingDni, setIsUploadingDni] = React.useState(false)

  // License
  const [licenseFront, setLicenseFront] = React.useState(
    props.user.license && props.user.license.front
  )
  const [frontSubmit, setFrontSubmit] = React.useState('')
  const [licenseBack, setLicenseBack] = React.useState(
    props.user.license && props.user.license.back
  )
  const [backSubmit, setBackSubmit] = React.useState('')
  const [isUploadingLicense, setIsUploadingLicense] = React.useState(false)

  const [isSavingCar, setIsSavingCar] = React.useState(false)
  const [canSubmitCar, setCanSubmitCar] = React.useState(false)

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
      maxLength: maxLengthPhone,
      setValue: value => {
        if (notWrongPhone(value)) {
          setPhone(formatPhone(value))
        }
      },
      validate: validPhone,
      keyboardType: 'phone-pad',
      placeholder: '+56 9 9999 9999',
    },
  ]
  const passwordFields = [
    {
      label: 'Actual',
      value: currentPassword,
      setValue: setCurrentPassword,
      isSecure: true,
      validate: password =>
        typeof password === 'string' ? password.length >= 8 : false,
    },
    {
      label: 'Nueva',
      value: newPassword,
      setValue: setNewPassword,
      isSecure: true,
      validate: password =>
        typeof password === 'string' ? password.length >= 8 : false,
    },
  ]
  const carFields = [
    {
      label: 'Patente',
      value: carPlate ? carPlate.toUpperCase() : carPlate,
      setValue: value => {
        if (notWrongPlate(value)) {
          setCarPlate(value)
        }
      },
      maxLength: () => 6,
      validate: validatePlate,
      editable: canSubmitCar,
      placeholder: 'AABB99',
    },
    {
      label: 'Color',
      value: carColor,
      setValue: setCarColor,
      validate: validateColor,
      editable: canSubmitCar,
      placeholder: 'Negro',
    },
    {
      label: 'Marca',
      value: carBrand,
      setValue: setCarBrand,
      validate: validateBrand,
      editable: canSubmitCar,
      placeholder: 'Toyota',
    },
    {
      label: 'Modelo',
      value: carModel,
      setValue: setCarModel,
      validate: validateModel,
      editable: canSubmitCar,
      placeholder: 'Corolla',
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
    const validFields = [...commonFields].every(field =>
      field.validate(field.value)
    )
    return validFields
  }

  const isValidCar = () => {
    const validFields = [...carFields].every(field =>
      field.validate(field.value)
    )
    return validFields
  }
  const alertIfCamPermissionsDisabledAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA)
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      if (status !== 'granted') {
        alert(
          'Debes habilitar los permisos para usar la cámara en configuración'
        )
      }
    }
  }

  const alertIfRollPermissionsDisabledAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        alert(
          'Debes habilitar los permisos a la biblioteca de imágenes en configuración'
        )
      }
    }
  }

  React.useEffect(() => {
    const stateUser = props.user
    const user = {
      name: stateUser.name,
      lastName: stateUser.lastName,
      phone: stateUser.phone,
    }
    if (stateUser.vehicles && stateUser.vehicles.length !== 0) {
      setGettingCar(true)
      props
        .getUserCar(stateUser.token, stateUser.vehicles[0].vehicle_id)
        .then(() => setGettingCar(false))
        .catch(() => setGettingCar(false))
    } else {
      setCanSubmitCar(true)
    }
    setName(user.name)
    setLastName(user.lastName)
    setPhone(user.phone)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    const { vehicles } = props.user
    if (
      vehicles &&
      vehicles.length &&
      vehicles[0].vehicle_attributes &&
      vehicles[0].vehicle_identifications
    ) {
      const vehicle = vehicles[0]
      const { color, brand, model } = vehicle.vehicle_attributes
      const { identification } = vehicle.vehicle_identifications
      setCarBrand(brand)
      setCarColor(color)
      setCarModel(model)
      setCarPlate(identification)
      setHasCar(true)
    }
  }, [props.user.vehicles])

  React.useEffect(() => {
    if (saveErr != null) {
      Alert.alert(
        'Error al cargar usuario',
        JSON.stringify(loadErr, null, '  ')
      )
    }
  }, [loadErr])

  // React.useEffect(() => {
  //   if (hasCar) {
  //     alertIfCamPermissionsDisabledAsync()
  //     alertIfRollPermissionsDisabledAsync()
  //   }
  // }, [hasCar])

  const saveUser = async () => {
    setIsLoading(true)
    const body = {
      first_name: name,
      last_name: lastName,
      phone,
    }
    const response = await props.updateUser(
      props.user.token,
      {
        ...body,
        user_identifications: {},
      },
      body
    )
    setIsLoading(false)
    if (response.error) {
      Alert.alert(
        'Error actualizando datos',
        'Hubo un problema actualizando tu informacion. Por favor inténtalo de nuevo.'
      )
    } else {
      Alert.alert('Actualización exitosa', 'Informacion actualizada con exito')
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

  const _pickImage = async () => {
    if (Constants.platform.ios) {
      const { status_roll } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      )
      if (status_roll !== 'granted') {
        alert(
          'Necesitamos permiso para poder acceder a tu cámara y biblioteca de imágenes.'
        )
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      base64: true,
    })

    if (!result.cancelled) {
      const { uri } = result
      const { uploadImage } = props
      if (uri) {
        setAvatar(result.uri)

        // TODO: refactor -> upload function & duplicate code on ImageSignupForm
        const [fileName, fileType] = uri
          .split('/')
          .slice(-1)[0]
          .split('.')
        const response = await uploadImage(fileName, fileType)
        if (
          !(await uploadImageToS3(response.payload.data.upload, fileType, uri))
        ) {
          Alert.alert(
            'Error al actualizar foto',
            'No hemos podido actualizar tu foto. Por favor inténtalo de nuevo.'
          )
        } else {
          const updateResponse = await props.updateUser(
            props.user.token,
            {
              user_identifications: {
                selfie_image: response.payload.data.image_id,
              },
            },
            {
              avatar: response.payload.data.fetch,
            }
          )
          if (updateResponse.error) {
            Alert.alert(
              'Error al actualizar foto',
              'No hemos podido actualizar tu foto. Por favor inténtalo de nuevo.'
            )
          }
        }
      }
    }
  }

  const onTakePicture = (photo, photoUri, dest) => {
    switch (dest) {
      case 'licenseFront':
        setLicenseFront(photoUri)
        setFrontSubmit(photo)
        break
      case 'licenseBack':
        setLicenseBack(photoUri)
        setBackSubmit(photo)
        break
      case 'dniFront':
        setDniFront(photoUri)
        setDniFrontSubmit(photo)
        break
      case 'dniBack':
        setDniBack(photoUri)
        setDniBackSubmit(photo)
        break
      default:
        break
    }
  }

  const onPressSaveDni = async () => {
    setIsUploadingDni(true)
    setIsLoading(true)

    // TODO: Refactor
    const [frontName, frontType] = dniFront
      .split('/')
      .slice(-1)[0]
      .split('.')
    const frontResponse = await props.uploadImage(frontName, frontType)
    if (
      !(await uploadImageToS3(
        frontResponse.payload.data.upload,
        frontType,
        dniFront
      ))
    ) {
      setIsUploadingDni(false)
      setIsLoading(false)
      Alert.alert(
        'Error actualizando datos',
        'Hubo un problema actualizando tu informacion. Por favor inténtalo de nuevo.'
      )
      return
    }
    const [backName, backType] = dniBack
      .split('/')
      .slice(-1)[0]
      .split('.')
    const backResponse = await props.uploadImage(backName, backType)
    if (
      !(await uploadImageToS3(
        backResponse.payload.data.upload,
        backType,
        dniBack
      ))
    ) {
      setIsUploadingDni(false)
      setIsLoading(false)
      Alert.alert(
        'Error actualizando datos',
        'Hubo un problema actualizando tu informacion. Por favor inténtalo de nuevo.'
      )
      return
    }
    const response = await props.updateUser(
      props.user.token,
      {
        user_identifications: {
          identification: {
            front: frontResponse.payload.data.image_id,
            back: backResponse.payload.data.image_id,
          },
        },
      },
      {
        dni: {
          front: frontResponse.payload.data.fetch,
          back: backResponse.payload.data.fetch,
        },
      }
    )
    setIsLoading(false)
    setDniFrontSubmit('')
    setDniBackSubmit('')
    setIsUploadingDni(false)
    if (response.error) {
      Alert.alert(
        'Error actualizando datos',
        'Hubo un problema actualizando tu informacion. Por favor inténtalo de nuevo.'
      )
    } else {
      Alert.alert('Actualización exitosa', 'Solicitud enviada con éxito')
    }
  }

  const onPressSaveLicense = async () => {
    setIsUploadingLicense(true)
    setIsLoading(true)

    // TODO: Refactor
    const [frontName, frontType] = licenseFront
      .split('/')
      .slice(-1)[0]
      .split('.')
    const frontResponse = await props.uploadImage(frontName, frontType)
    if (
      !(await uploadImageToS3(
        frontResponse.payload.data.upload,
        frontType,
        licenseFront
      ))
    ) {
      setIsUploadingLicense(false)
      setIsLoading(false)
      Alert.alert(
        'Error actualizando datos',
        'Hubo un problema actualizando tu informacion. Por favor inténtalo de nuevo.'
      )
      return
    }
    const [backName, backType] = licenseBack
      .split('/')
      .slice(-1)[0]
      .split('.')
    const backResponse = await props.uploadImage(backName, backType)
    if (
      !(await uploadImageToS3(
        backResponse.payload.data.upload,
        backType,
        licenseBack
      ))
    ) {
      setIsUploadingLicense(false)
      setIsLoading(false)
      Alert.alert(
        'Error actualizando datos',
        'Hubo un problema actualizando tu informacion. Por favor inténtalo de nuevo.'
      )
      return
    }
    const response = await props.updateUser(
      props.user.token,
      {
        user_identifications: {
          driver_license: {
            front: frontResponse.payload.data.image_id,
            back: backResponse.payload.data.image_id,
          },
        },
      },
      {
        license: {
          front: frontResponse.payload.data.fetch,
          back: backResponse.payload.data.fetch,
        },
      }
    )
    setIsLoading(false)
    setFrontSubmit('')
    setBackSubmit('')
    setIsUploadingLicense(false)
    if (response.error) {
      Alert.alert(
        'Error actualizando datos',
        'Hubo un problema actualizando tu informacion. Por favor inténtalo de nuevo.'
      )
    } else {
      Alert.alert('Actualización exitosa', 'Solicitud enviada con éxito')
    }
  }

  const onPressUpdatePassword = async () => {
    setIsLoading(true)
    setIsChangePasswordActive(false)
    const response = await props.updateUser(props.user.token, {
      current_password: currentPassword,
      new_password: newPassword,
    })
    if (response.error) {
      Alert.alert(
        'Error cambiando contraseña',
        'Hubo un problema al intentar cambiar tu contraseña. Por favor inténtalo de nuevo.'
      )
    } else {
      Alert.alert(
        'Actualización exitosa',
        'Tu contraseña se ha cambiado con éxito'
      )
    }
    setIsLoading(false)
  }

  const onPressSaveCar = async () => {
    const { token, email } = props.user
    setIsSavingCar(true)
    setIsLoading(true)
    const response = await props.createVehicle(token, {
      alias: `Vehicle ${email}`,
      vehicle_identifications: {
        type: 'license_plate',
        identification: carPlate.toUpperCase(),
        country: 'CL',
      },
      vehicle_attributes: {
        brand: carBrand,
        model: carModel,
        type: 'car',
        seats: 1,
        color: carColor,
      },
    })
    setIsLoading(false)
    setIsSaving(false)
    if (response.error) {
      Alert.alert(
        'Error ingresando el vehículo',
        'Hubo un problema al intentar ingresar tu vehículo. Por favor inténtalo de nuevo.'
      )
    } else {
      setCanSubmitCar(false)
      Alert.alert('Ingreso exitoso', 'Tu vehículo fue ingresado exitosamente')
    }
  }

  const takePhoto = async dest => {
    alertIfCamPermissionsDisabledAsync()
    const photo = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    })
    if (!photo.cancelled) {
      onTakePicture(photo.base64, photo.uri, dest)
    }
  }

  const choosePhoto = async dest => {
    alertIfRollPermissionsDisabledAsync()
    const photo = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    })
    if (!photo.cancelled) {
      onTakePicture(photo.base64, photo.uri, dest)
    }
  }

  const checkValidPasswords = () => {
    const validCurrentPassword =
      typeof currentPassword === 'string' ? currentPassword.length >= 8 : false
    const validNewPassword =
      typeof newPassword === 'string' ? newPassword.length >= 8 : false
    return validCurrentPassword && validNewPassword
  }

  const renderVerification = (verified, title) => {
    if (verified) {
      return (
        <View style={styles.verifiedContainer}>
          <Text style={styles.verifiedText}>{title}</Text>
          <Octicons
            name={verified ? 'verified' : 'unverified'}
            color={verified ? 'green' : 'red'}
            size={14}
          />
        </View>
      )
    }
    return null
  }

  alertIfCamPermissionsDisabledAsync()
  alertIfRollPermissionsDisabledAsync()
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.flex1}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Content>
          <View style={{ minHeight: 2900 }}>
            <View style={styles.row}>
              <TouchableWithoutFeedback
                disabled={isSaving || !isValidUser()}
                onPress={_pickImage}
              >
                <View>
                  <View style={styles.profilePhoto}>
                    {avatar ? (
                      <Thumbnail source={{ uri: avatar }} large />
                    ) : (
                      <MaterialCommunityIcons
                        name="face-profile"
                        color="gray"
                        size={photoSize}
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={styles.buttonText}>Editar foto</Text>
                    <Entypo name="edit" style={{ marginLeft: 4 }} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
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
                  disabled={isChangePasswordActive}
                  onPress={() => setIsChangePasswordActive(true)}
                >
                  <Text style={styles.buttonText}>Cambiar contraseña</Text>
                </Button>
                <Modal
                  animationType="slide"
                  transparent={false}
                  presentationStyle="fullScreen"
                  visible={isChangePasswordActive}
                  onRequestClose={() => setIsChangePasswordActive(false)}
                >
                  <View style={styles.updatePasswordModal}>
                    <View style={styles.hiddenFlex}></View>
                    <View>
                      <H2>Actualiza tu contraseña</H2>
                      <View style={styles.passwordFields}>
                        {passwordFields.map(field => (
                          <Field
                            key={field.label}
                            field={field}
                            validity="partial"
                          />
                        ))}
                      </View>
                      <Button
                        block
                        borderRadius={10}
                        style={styles.blueButton}
                        disabled={isSaving || !checkValidPasswords()}
                        onPress={onPressUpdatePassword}
                        color={'#0000FF'}
                      >
                        <Text style={styles.buttonText}>
                          Cambiar contraseña
                        </Text>
                      </Button>
                    </View>
                    <View style={styles.hiddenFlex}></View>
                  </View>
                </Modal>
              </View>
            </View>
            <Form style={styles.form}>
              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Datos Personales</Text>
              </View>
              {commonFields.map(field => (
                <Field key={field.label} field={field} validity="partial" />
              ))}
              <Button
                block
                borderRadius={10}
                style={styles.blueButton}
                disabled={isSaving || !isValidUser()}
                onPress={onPressSaveProfile}
                color={'#0000FF'}
              >
                <Text style={styles.buttonText}>Guardar cambios</Text>
              </Button>

              <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>Identificación</Text>
              </View>
              <PhotoTaker
                takePhoto={takePhoto}
                choosePhoto={choosePhoto}
                setImage={'dniFront'}
                selfie={dniFront}
                iconName="vcard-o"
                iconType="FontAwesome"
                size={60}
                title="Foto frontal Carnet de Identidad"
              />
              <PhotoTaker
                takePhoto={takePhoto}
                choosePhoto={choosePhoto}
                setImage={'dniBack'}
                selfie={dniBack}
                iconName="vcard-o"
                iconType="FontAwesome"
                size={60}
                title="Foto trasera Carnet de Identidad"
              />
              {dniFront && props.user.verifications ? (
                renderVerification(
                  props.user.verifications.dni,
                  'Estado verificación: '
                )
              ) : (
                <></>
              )}
              <Button
                block
                borderRadius={10}
                style={styles.blueButton}
                disabled={isUploadingDni || !dniFrontSubmit || !dniBackSubmit}
                onPress={onPressSaveDni}
                color={'#0000FF'}
              >
                <Text style={styles.buttonText}>Solicitar revisión</Text>
              </Button>

              {gettingCar && <Spinner color={'#0000FF'} />}
              {!gettingCar && (
                <TouchableOpacity
                  style={styles.rowCenter}
                  onPress={() => setHasCar(!hasCar)}
                >
                  <CheckBox
                    color={Colors.textGray}
                    checked={hasCar}
                    onPress={() => setHasCar(!hasCar)}
                  />
                  <Text style={styles.checkboxLabel}>Tengo Vehículo</Text>
                </TouchableOpacity>
              )}
              {hasCar ? (
                <View>
                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Licencia de conducir</Text>
                  </View>
                  <PhotoTaker
                    takePhoto={takePhoto}
                    choosePhoto={choosePhoto}
                    setImage={'licenseFront'}
                    selfie={licenseFront}
                    iconName="vcard-o"
                    iconType="FontAwesome"
                    size={60}
                    title="Foto frontal Licencia de conducir"
                  />
                  <PhotoTaker
                    takePhoto={takePhoto}
                    choosePhoto={choosePhoto}
                    setImage={'licenseBack'}
                    selfie={licenseBack}
                    iconName="vcard-o"
                    iconType="FontAwesome"
                    size={60}
                    title="Foto trasera Licencia de conducir"
                  />
                  {licenseFront && props.user.verifications ? (
                    renderVerification(
                      props.user.verifications.license,
                      'Estado verificación: '
                    )
                  ) : (
                    <></>
                  )}
                  <Button
                    block
                    borderRadius={10}
                    style={styles.blueButton}
                    disabled={isUploadingLicense || !frontSubmit || !backSubmit}
                    onPress={onPressSaveLicense}
                    color={'#0000FF'}
                  >
                    <Text style={styles.buttonText}>Solicitar revisión</Text>
                  </Button>

                  <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Datos Vehículo</Text>
                  </View>
                  {canSubmitCar ? (
                    <View style={styles.headerTextContainer}>
                      <Text style={styles.warning}>
                        Advertencia: los datos del vehículo no podrán ser
                        modificados una vez ingresados
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {carFields.map(field => (
                    <Field key={field.label} field={field} validity="partial" />
                  ))}
                  {canSubmitCar ? (
                    <Button
                      block
                      borderRadius={10}
                      style={styles.blueButton}
                      disabled={!canSubmitCar || !isValidCar()}
                      onPress={onPressSaveCar}
                      color={'#0000FF'}
                    >
                      <Text style={styles.buttonText}>Ingresar Vehículo</Text>
                    </Button>
                  ) : (
                    <></>
                  )}
                </View>
              ) : (
                <></>
              )}
            </Form>
          </View>
          {hasCar && <View style={styles.artificialKeyboardPadding} />}
        </Content>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
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

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  updateUser: (authToken, data, ed) =>
    dispatch(updateUser(authToken, data, ed)),
  uploadImage: (name, type) => dispatch(getImageUrl(name, type)),
  signOut: () => dispatch(signoutUser()),
  getUserCar: (token, carId) => dispatch(getUserCar(token, carId)),
  createVehicle: (token, data) => dispatch(createVehicle(token, data)),
})

const photoSize = 96

const styles = StyleSheet.create({
  artificialKeyboardPadding: { height: 1000 },
  blueButton: {
    marginBottom: 30,
    marginTop: 20,
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
  headerTextContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
  },
  hiddenFlex: {
    flex: 1,
  },
  input: {
    fontSize: 14,
    height: 40,
    width: Layout.window.width * 0.85,
  },
  item: {
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
  },
  label: {
    color: '#8c8c8c',
    fontSize: 14,
    paddingRight: 10,
    width: Layout.window.width * 0.21,
  },
  logout: {
    marginRight: 8,
  },
  passwordFields: {
    marginTop: 30,
    width: Layout.window.width * 0.9,
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
  updatePasswordModal: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: Layout.window.height,
    justifyContent: 'space-around',
  },
  verifiedContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  warning: {
    color: 'red',
    marginBottom: 10,
  },
})

const _SignOutC = props => (
  <TouchableOpacity
    onPress={() =>
      Alert.alert('Salir', '¿Deseas cerrar sesión?', [
        {
          text: 'Si',
          onPress: () => {
            AsyncStorage.removeItem('@userToken')
            AsyncStorage.removeItem('@userId')
            // eslint-disable-next-line react/prop-types
            props.navigation.navigate('Login')
            // eslint-disable-next-line react/prop-types
            props.signOut()
          },
        },
        { text: 'No', style: 'cancel' },
      ])
    }
  >
    <View style={styles.logout}>
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-log-out' : 'md-log-out'}
        size={25}
      />
    </View>
  </TouchableOpacity>
)

const SignOutC = connect(
  null,
  mapDispatchToProps
)(_SignOutC)

EditProfileScreen.navigationOptions = ({ navigation }) => ({
  title: 'Editar perfil',
  headerRight: <SignOutC navigation={navigation} />,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(EditProfileScreen))
