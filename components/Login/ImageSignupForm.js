import React from 'react'
import { Alert } from 'react-native'
import { View, Spinner, Button, Text } from 'native-base'
import PhotoTaker from './PhotoTaker'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signupUser, uploadImageUser } from '../../redux/actions/user'
import * as ImagePicker from 'expo-image-picker'

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
