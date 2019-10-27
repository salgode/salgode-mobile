import React from 'react'
import { Container, Text, H2, Button } from 'native-base'
import PropTypes from 'prop-types'
import { StyleSheet, Modal } from 'react-native'
import { Camera } from 'expo-camera'
import Layout from '../../constants/Layout'
import getString from '../../languages'

const CameraModal = ({
  isCameraOn,
  closeCamera,
  onGetSelfie,
  destination,
  cameraType,
  text,
}) => {
  const [camera, setCamera] = React.useState(null)

  const getSelfie = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({
        quality: 0.5,
        base64: true,
      })
      onGetSelfie(photo.base64, photo.uri, destination)
    }
    closeCamera()
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      presentationStyle="fullScreen"
      visible={isCameraOn}
      onRequestClose={closeCamera}
      style={styles.modal}
    >
      <Camera
        style={styles.camera}
        type={cameraType}
        ref={ref => {
          setCamera(ref)
        }}
        ratio="1:1"
      ></Camera>
      <Container style={styles.container}>
        <H2>{text}</H2>
        <Button
          borderRadius={10}
          style={styles.buttonCamera}
          onPress={getSelfie}
        >
          <Text>{getString('camera.takePhoto')}</Text>
        </Button>
      </Container>
    </Modal>
  )
}

CameraModal.propTypes = {
  isCameraOn: PropTypes.bool.isRequired,
  closeCamera: PropTypes.func.isRequired,
  onGetSelfie: PropTypes.func.isRequired,
  destination: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  buttonCamera: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    maxHeight: 60,
  },
  camera: {
    height: Layout.window.width,
    position: 'absolute',
    width: Layout.window.width,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: Layout.window.width,
  },
  modal: {
    backgroundColor: 'black',
    display: 'flex',
  },
})

export default CameraModal
