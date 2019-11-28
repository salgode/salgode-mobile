import React from 'react'
import { Alert, StyleSheet, ScrollView } from 'react-native'
import { View, Spinner, Button, Text } from 'native-base'
import PhotoTaker from './PhotoTaker'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { signupUser, getImageUrl } from '../../redux/actions/user'
import { uploadImageToS3 } from '../../utils/image'
import * as Permissions from 'expo-permissions'
import { analytics, ANALYTICS_CATEGORIES } from '../../utils/analytics'

const ImageSignupForm = ({ navigation, uploadImage, signup }) => {
  const [selfie, setSelfie] = React.useState('')
  const [frontId, setFrontId] = React.useState('')
  const [backId, setBackId] = React.useState('')
  const [userData, setUserData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const userData = navigation.getParam('userData', null)
    userData.user_identifications = {
      selfie: null,
      identification_image_front: null,
      identification_image_back: null,
    }
    setUserData(userData)
  }, [])

  const alertIfCamPermissionsDisabledAsync = async () => {
    const camGet = await Permissions.getAsync(Permissions.CAMERA)
    if (camGet.status !== 'granted') {
      const camAsk = await Permissions.askAsync(Permissions.CAMERA)
      if (camAsk.status !== 'granted') {
        alert(
          'Debes habilitar los permisos para usar la cámara en configuración'
        )
      }
    }
  }

  const alertIfRollPermissionsDisabledAsync = async () => {
    const rollGet = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (rollGet.status !== 'granted') {
      const rollAsk = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (rollAsk.status !== 'granted') {
        alert(
          'Debes habilitar los permisos a la biblioteca de imágenes en configuración'
        )
      }
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

  const onTakePicture = (photo, photoUri, dest) => {
    switch (dest) {
      case 'selfie':
        setSelfie(photoUri)
        setUserData(oldData => ({
          ...oldData,
          user_identifications: {
            ...oldData.user_identifications,
            selfie: photo,
          },
        }))
        break
      case 'frontId':
        setFrontId(photoUri)
        setUserData(oldData => ({
          ...oldData,
          user_identifications: {
            ...oldData.user_identifications,
            identification_image_front: photo,
          },
        }))
        break
      case 'backId':
        setBackId(photoUri)
        setUserData(oldData => ({
          ...oldData,
          user_identifications: {
            ...oldData.user_identifications,
            identification_image_back: photo,
          },
        }))
        break
      default:
      // eslint-disable-next-line no-console
      // console.log(dest)
    }
  }

  const onSend = async () => {
    setLoading(true)

    // TODO: Refactor -> upload function
    const [selfieFN, selfieFT] = selfie
      .split('/')
      .slice(-1)[0]
      .split('.')
    const selfieResponse = await uploadImage(selfieFN, selfieFT)
    if (
      !(await uploadImageToS3(
        selfieResponse.payload.data.upload,
        selfieFT,
        selfie
      ))
    ) {
      setLoading(false)
      Alert.alert(
        'Error de registro',
        'Hubo un problema en el proceso de registro. Por favor inténtalo de nuevo.'
      )
      return
    }
    const [frontFN, frontFT] = frontId
      .split('/')
      .slice(-1)[0]
      .split('.')
    const frontResponse = await uploadImage(frontFN, frontFT)
    if (
      !(await uploadImageToS3(
        frontResponse.payload.data.upload,
        frontFT,
        frontId
      ))
    ) {
      setLoading(false)
      Alert.alert(
        'Error de registro',
        'Hubo un problema en el proceso de registro. Por favor inténtalo de nuevo.'
      )
      return
    }
    const [backFN, backFT] = backId
      .split('/')
      .slice(-1)[0]
      .split('.')
    const backResponse = await uploadImage(backFN, backFT)
    if (
      !(await uploadImageToS3(backResponse.payload.data.upload, backFT, backId))
    ) {
      setLoading(false)
      Alert.alert(
        'Error de registro',
        'Hubo un problema en el proceso de registro. Por favor inténtalo de nuevo.'
      )
      return
    }
    const user = await signup(
      userData.name,
      userData.lastName,
      userData.email,
      userData.phone,
      userData.password,
      userData.passwordRepeat,
      selfieResponse.payload.data.image_id,
      frontResponse.payload.data.image_id,
      backResponse.payload.data.image_id
    )
    setLoading(false)
    if (user.error) {
      Alert.alert(
        'Error de registro',
        'El correo que has ingresado ya está en uso. Por lo que podrías ya estar registrado en la app. De no ser así, por favor inténtalo ingresando un correo distinto.'
      )
    } else {
      analytics.newEvent(
        ANALYTICS_CATEGORIES.LogIn.name,
        ANALYTICS_CATEGORIES.LogIn.actions.SignUp
      )

      Alert.alert(
        'Registro exitoso',
        'Se ha enviado un correo de confirmación a tu cuenta'
      )
      navigation.navigate('Login')
    }
  }

  const validity = () => {
    if (!userData) {
      return false
    }

    const validity =
      userData.name &&
      userData.lastName &&
      userData.email &&
      userData.phone &&
      userData.password &&
      userData.passwordRepeat &&
      userData.user_identifications.selfie &&
      userData.user_identifications.identification_image_front &&
      userData.user_identifications.identification_image_back
    return validity
  }
  alertIfCamPermissionsDisabledAsync()
  alertIfRollPermissionsDisabledAsync()
  return (
    <ScrollView>
      <View style={styles.container}>
        <PhotoTaker
          takePhoto={takePhoto}
          choosePhoto={choosePhoto}
          selfie={selfie}
          setImage={'selfie'}
          disableLibrary={true}
          title="Subir selfie"
        />
        <PhotoTaker
          takePhoto={takePhoto}
          choosePhoto={choosePhoto}
          setImage={'frontId'}
          selfie={frontId}
          iconName="vcard-o"
          iconType="FontAwesome"
          size={60}
          title="Foto frontal Carnet de Identidad"
        />
        <PhotoTaker
          takePhoto={takePhoto}
          choosePhoto={choosePhoto}
          setImage={'backId'}
          selfie={backId}
          iconName="vcard-o"
          iconType="FontAwesome"
          size={60}
          title="Foto trasera Carnet de Identidad"
        />

        <View>
          <Text style={{ marginHorizontal: 10, fontSize: 12 }}>
            Las fotos de tu identificación son totalmente privadas y de uso
            exclusivo para verificar tu identidad como usuario dentro de la
            aplicación
          </Text>
        </View>

        {loading && <Spinner color={'#0000FF'} />}
        {!loading && (
          <Button
            block
            borderRadius={10}
            style={styles.button}
            disabled={!validity()}
            onPress={onSend}
          >
            <Text>Registrar</Text>
          </Button>
        )}
        <View style={{ marginBottom: 50 }} />
      </View>
    </ScrollView>
  )
}

ImageSignupForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  uploadImage: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  button: {
    margin: 20,
  },
  container: {
    marginTop: 30,
  },
})

const mapDispatchToProps = dispatch => ({
  uploadImage: (name, type) => dispatch(getImageUrl(name, type)),
  signup: (
    name,
    lastName,
    email,
    phone,
    password,
    passwordRepeat,
    selfieLink,
    identification_image_front,
    identification_image_back
    // driverLicenseLink,
    // dniLink,
    // carPlate,
    // carColor,
    // carBrand,
    // carModel
  ) =>
    dispatch(
      signupUser(
        name,
        lastName,
        email,
        phone,
        password,
        passwordRepeat,
        selfieLink,
        identification_image_front,
        identification_image_back
        // driverLicenseLink,
        // driverLicenseLink,
        // dniLink,
        // carPlate,
        // carColor,
        // carBrand,
        // carModel
      )
    ),
})

export default connect(
  null,
  mapDispatchToProps
)(ImageSignupForm)
