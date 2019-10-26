import React from 'react'
import { Alert } from 'react-native'
import { View, Spinner, Button, Text } from 'native-base'
import CameraModal from './CameraModal'
import * as Permissions from 'expo-permissions'
import PhotoTaker from './PhotoTaker'
import PropTypes from 'prop-types'
import { Camera } from 'expo-camera'
import { connect } from 'react-redux'
import { signupUser, uploadImageUser } from '../../redux/actions/user'

const getCameraType = (destination) => {
  if (destination === 'selfie') {
    return Camera.Constants.Type.front
  }
  return Camera.Constants.Type.back
}

const getText = (destination) => {
  switch (destination) {
    case 'selfie':
      return 'Sonríe para la cámara'
    case 'frontId':
      return 'Cédula de identidad frontal'
    case 'backId':
      return 'Cédula de identidad trasera'
    default:
      return ''
  }
}

const ImageSignupForm = ({ navigation, uploadImage, signup }) => {
  const [isCameraOn, setIsCameraOn] = React.useState(false)
  const [hasCameraPermission, setHasCameraPermission] = React.useState(false)
  const [selfie, setSelfie] = React.useState(null)
  const [frontId, setFrontId] = React.useState(null)
  const [backId, setBackId] = React.useState(null)
  const [destination, setDestination] = React.useState('selfie')
  const [userData, setUserData] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setHasCameraPermission(status === 'granted')
  }

  React.useEffect(() => {
    const userData = navigation.getParam('userData', null)
    userData.user_identifications = {
      selfie: null,
      identification_image_front: null,
      identification_image_back: null,
    }
    setUserData(userData)
    requestCameraPermission()
  }, [])

  const openCamera = dest => {
    setDestination(dest)
    setIsCameraOn(true)
  }

  const closeCamera = () => {
    setIsCameraOn(false)
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
    const selfieUrl = await uploadImage(userData.selfie)
    const frontIdUrl = await uploadImage(userData.identification_image_front)
    const backIdUrl = await uploadImage(userData.identification_image_back)
    const user = await signup(
      userData.name,
      userData.lastName,
      userData.email,
      userData.phone,
      userData.password,
      userData.passwordRepeat,
      selfieUrl,
      frontIdUrl,
      backIdUrl
    ).then(response => {
      return response
    })
    setLoading(false)
    if (user.error) {
      Alert.alert(
        'Error de registro',
        'Hubo un problema registrandote. Por favor intentalo de nuevo.'
      )
    } else {
      navigation.navigate('ChooseTrips')
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

  return (
    <View>
      {hasCameraPermission && (
        <CameraModal
          closeCamera={closeCamera}
          onGetSelfie={onTakePicture}
          isCameraOn={isCameraOn}
          destination={destination}
          cameraType={getCameraType(destination)}
          text={getText(destination)}
        />
      )}
      <PhotoTaker
        openCamera={openCamera}
        selfie={selfie}
        setImage={'selfie'}
        buttonText="Tomar Selfie"
      />
      <PhotoTaker
        openCamera={openCamera}
        setImage={'frontId'}
        selfie={frontId}
        iconName="vcard-o"
        iconType="FontAwesome"
        size={60}
        buttonText="Tomar Frente de Carnet"
      />
      <PhotoTaker
        openCamera={openCamera}
        setImage={'backId'}
        selfie={backId}
        iconName="vcard-o"
        iconType="FontAwesome"
        size={60}
        buttonText="Tomar Atras de Carnet"
      />

      {loading && <Spinner color={'#0000FF'} />}
      {!loading && (
        <Button
          block
          borderRadius={10}
          style={styles.button}
          disabled={!validity()}
          onPress={onSend}
        >
          <Text>Siguiente</Text>
        </Button>
      )}
    </View>
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

const styles = {
  button: {
    margin: 20,
  },
}

const mapDispatchToProps = dispatch => ({
  uploadImage: img => dispatch(uploadImageUser(img)),
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
