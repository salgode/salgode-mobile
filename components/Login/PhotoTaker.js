import React from 'react'
import { View, Button, Text } from 'native-base'
import { Image, Platform, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

const PhotoTaker = ({
  selfie,
  takePhoto,
  choosePhoto,
  iconName = Platform.OS === 'ios' ? 'ios-contact' : 'md-contact',
  iconType = 'Ionicon',
  setImage,
  size = 80,
  buttonText = 'Tomar foto',
  disableLibrary = false,
}) => {
  if (selfie) {
    return (
      <View style={styles.container}>
        <Image style={styles.iconView} source={{ uri: selfie }} />
        <View style={styles.buttonContainer}>
          {disableLibrary ? null : (
            <Button
              block
              borderRadius={10}
              style={styles.button}
              onPress={() => choosePhoto(setImage)}
            >
              <Text>{buttonText}</Text>
            </Button>
          )}

          <Button
            block
            borderRadius={10}
            style={styles.icon}
            onPress={() => takePhoto(setImage)}
          >
            <Ionicons name="ios-camera" size={20} color="white" />
          </Button>
        </View>
      </View>
    )
  } else {
    const Icon = iconType === 'Ionicon' ? Ionicons : FontAwesome
    return (
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Icon name={iconName} size={size} />
        </View>
        <View style={styles.buttonContainer}>
          {disableLibrary ? null : (
            <Button
              block
              borderRadius={10}
              style={styles.button}
              onPress={() => choosePhoto(setImage)}
            >
              <Text>{buttonText}</Text>
            </Button>
          )}
          <Button
            block
            borderRadius={10}
            style={styles.icon}
            onPress={() => takePhoto(setImage)}
          >
            <Ionicons name="ios-camera" size={20} color="white" />
          </Button>
        </View>
      </View>
    )
  }
}

PhotoTaker.propTypes = {
  selfie: PropTypes.string,
  takePhoto: PropTypes.func.isRequired,
  choosePhoto: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  iconType: PropTypes.oneOf(['Ionicon', 'FontAwesome']),
  setImage: PropTypes.string.isRequired,
  size: PropTypes.number,
  buttonText: PropTypes.string,
}

const styles = StyleSheet.create({
  button: {
    flex: 3,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '60%',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 20,
  },
  icon: {
    flex: 1,
    marginHorizontal: 5,
  },
  iconView: {
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    height: 100,
    justifyContent: 'center',
    marginRight: 20,
    width: 100,
  },
})

export default PhotoTaker
