import React from 'react'
import { Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import { StyleSheet, Modal } from 'react-native'
import { Camera } from 'expo-camera'
import Layout from '../../constants/Layout'
import getString from '../../languages'

const CameraModal = ({ isCameraOn, closeCamera, onGetSelfie, destination }) => {
  // eslint-disable-next-line no-unused-vars
  const [cameraType, setCameraType] = React.useState(
    Camera.Constants.Type.front
  )
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
      >
        {/* <View style={styles.view}>
          <TouchableOpacity
            onPress={() => {
              setCameraType({
                type:
                  cameraType === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back,
              })
            }}
          >
            <Button borderRadius={10} style={styles.icon}>
              <Ionicons name="md-reverse-camera" color="white" size={24} />
            </Button>
          </TouchableOpacity>
        </View> */}
      </Camera>
      <Button borderRadius={10} style={styles.buttonCamera} onPress={getSelfie}>
        <Text>{getString('camera.takePhoto')}</Text>
      </Button>
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
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: Layout.window.height - 70,
  },
  camera: {
    height: Layout.window.width,
    position: 'absolute',
    width: Layout.window.width,
  },
  // icon: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginLeft: 15,
  //   marginTop: 20,
  //   width: 40,
  // },
  modal: {
    backgroundColor: 'black',
  },
  // view: {
  //   backgroundColor: 'transparent',
  //   flex: 0.1,
  //   flexDirection: 'row',
  // },
})

export default CameraModal
