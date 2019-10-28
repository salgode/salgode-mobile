import React from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import { View, Spinner, Button, Text } from 'native-base'
import PhotoTaker from './PhotoTaker'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import { signupUser, getImageUrl } from '../../redux/actions/user'

const getCameraType = destination => {
  if (destination === 'selfie') {
    return Camera.Constants.Type.front
  }
  return Camera.Constants.Type.back
}

const getText = destination => {
  switch (destination) {
    case 'selfie':
      return 'Sonríe'
    case 'frontId':
      return 'Cédula de identidad frontal'
    case 'backId':
      return 'Cédula de identidad trasera'
    default:
      return ''
  }
}

const ImageSignupForm = ({ navigation, uploadImage, signup }) => {
  const [selfie, setSelfie] = React.useState(null)
  const [frontId, setFrontId] = React.useState(null)
  const [backId, setBackId] = React.useState(null)
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

  const takePhoto = async dest => {
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

  const uploadImageToS3 = async (signedRequest, file, fileType) => {
    console.log(signedRequest.upload)
    const response = await axios.put(signedRequest.upload, file, {
      headers: {
        'Content-Type': fileType.toUpperCase(),
      },
    })
    console.log(signedRequest.fetch)
    return response.status === 200
  }

  const onSend = async () => {
    setLoading(true)

    // TODO: Refactor -> upload function
    const [selfieFN, selfieFT] = selfie.split('/').slice(-1)[0].split('.')
    const selfieResponse = await uploadImage(selfieFN, selfieFT)
    if (!await uploadImageToS3(selfieResponse.payload.data, userData.user_identifications.selfie, selfieFT)) {
      setLoading(false)
      Alert.alert(
        'Error de registro',
        'Hubo un problema registrandote. Por favor intentalo de nuevo.'
      )
    }
    const [frontFN, frontFT] = frontId.split('/').slice(-1)[0].split('.')
    const frontResponse = await uploadImage(frontFN, frontFT)
    if (!uploadImageToS3(frontResponse.payload.data.upload, userData.user_identifications.identification_image_front, frontFT)) {
      setLoading(false)
      Alert.alert(
        'Error de registro',
        'Hubo un problema registrandote. Por favor intentalo de nuevo.'
      )
    }
    const [backFN, backFT] = backId.split('/').slice(-1)[0].split('.')
    const backResponse = await uploadImage(backFN, backFT)
    if (!uploadImageToS3(backResponse.payload.data.upload, userData.user_identifications.identification_image_back, backFT)) {
      setLoading(false)
      Alert.alert(
        'Error de registro',
        'Hubo un problema registrandote. Por favor intentalo de nuevo.'
      )
    }
    const user = await signup(
      userData.name,
      userData.lastName,
      userData.email,
      userData.phone,
      userData.password,
      userData.passwordRepeat,
      selfieResponse.payload.data.fetch,
      frontResponse.payload.data.fetch,
      backResponse.payload.data.fetch,
    )
    setLoading(false)
    console.log(user.error)
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
      <PhotoTaker
        takePhoto={takePhoto}
        choosePhoto={choosePhoto}
        selfie={selfie}
        setImage={'selfie'}
        buttonText="Subir Selfie"
        disableLibrary={true}
      />
      <PhotoTaker
        takePhoto={takePhoto}
        choosePhoto={choosePhoto}
        setImage={'frontId'}
        selfie={frontId}
        iconName="vcard-o"
        iconType="FontAwesome"
        size={60}
        buttonText="Subir Frente de Carnet"
      />
      <PhotoTaker
        takePhoto={takePhoto}
        choosePhoto={choosePhoto}
        setImage={'backId'}
        selfie={backId}
        iconName="vcard-o"
        iconType="FontAwesome"
        size={60}
        buttonText="Subir Atras de Carnet"
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
