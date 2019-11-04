import React, { Component } from 'react'
import { StyleSheet, Platform, Linking } from 'react-native'
import { Card, CardItem, View, Text, Thumbnail, Button } from 'native-base'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import Location from './Location'
import { shareToWhatsApp } from '../../../utils/whatsappShare'

const photoSize = 96

class PassengerDetails extends Component {
  constructor(props) {
    super(props)
    this.renderAvatar = this.renderAvatar.bind(this)
    this.renderVerification = this.renderVerification.bind(this)
    this.dialCall = this.dialCall.bind(this)
  }

  dialCall(phoneNumber) {
    if (phoneNumber) {
      let link = ''
      if (Platform.OS === 'android') {
        link = `tel:${phoneNumber}`
      } else {
        link = `telprompt:${phoneNumber}`
      }
      Linking.openURL(link)
    }
  }

  renderAvatar() {
    const { avatar } = this.props
    if (avatar) {
      return <Thumbnail source={{ uri: avatar }} large />
    } else {
      return (
        <MaterialCommunityIcons
          name="face-profile"
          color="gray"
          size={photoSize}
        />
      )
    }
  }

  renderVerification(verified, title) {
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

  render() {
    const { name, phone, verified, start } = this.props
    return (
      <Card
        style={{
          ...styles.cardContainer,
          ...styles.shadow,
        }}
      >
        <CardItem>
          <View style={styles.user}>
            <View style={styles.profilePhoto}>{this.renderAvatar()}</View>
            <View style={styles.userContainer}>
              <Text style={styles.userText}>{`${name}`}</Text>
              <Text
                style={styles.phoneText}
                onPress={() => this.dialCall(phone)}
              >
                {phone}
              </Text>
              {this.renderVerification(verified, 'Usuario verificado ')}
            </View>
          </View>
        </CardItem>

        <CardItem style={styles.locationContainer}>
          <Text style={styles.subeEnText}>#Sube en</Text>
          <Location color={'#0000FF'} location={start} />
        </CardItem>

        <CardItem>
          <Button
            style={{ ...styles.buttonTrip, backgroundColor: 'green' }}
            onPress={() => this.dialCall(phone)}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 10,
                fontWeight: '700',
                alignSelf: 'center',
              }}
            >
              Llamar
            </Text>
          </Button>
        </CardItem>
      </Card>
    )
  }
}

PassengerDetails.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  verified: PropTypes.bool.isRequired,
  start: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  buttonTrip: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'flex-start',
    borderColor: 'white',
    flexDirection: 'column',
    borderRadius: 20,
    padding: 15,
  },
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  phoneText: {
    color: 'grey',
    fontSize: 14,
    marginLeft: 15,
    marginTop: 3,
  },
  shadow: {
    shadowColor: '#b3b3b3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  subeEnText: {
    marginBottom: 5,
  },
  thumbnail: {
    height: photoSize,
    resizeMode: 'center',
    width: photoSize,
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },
  userText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  verifiedContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  verifiedText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 15,
    marginTop: 3,
  },
})

export default PassengerDetails
