import React, { Component } from 'react'
import { StyleSheet, Linking } from 'react-native'
import { Card, CardItem, View, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'
import TimeInfo from './TimeInfo'
import Location from './Location'
import Colors from '../../../constants/Colors'

const photoSize = 96

class TripDetails extends Component {
  constructor(props) {
    super(props)
    this.readonlyField = this.readonlyField.bind(this)
    this.renderLocation = this.renderLocation.bind(this)
    this.renderIdentification = this.renderIdentification.bind(this)
    this.renderVerification = this.renderVerification.bind(this)
  }

  readonlyField(label, data) {
    return (
      <View style={styles.readonlyField}>
        <Text style={[styles.label, styles.readonlyFieldText]}>{label}</Text>
        <Text style={styles.readonlyFieldText}>{data}</Text>
      </View>
    )
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

  renderLocation(locations) {
    return locations.map((location, index) => {
      let color
      if (index === 0) {
        color = '#0000FF'
      } else if (index === locations.length - 1) {
        color = '#33C534'
      } else {
        color = Colors.textGray //index === locations.length - 1 ? '#33C534'
      }
      return (
        <Location key={`location-${index}`} color={color} location={location} />
      )
    })
  }

  renderIdentification(identificationLink, altText = '') {
    if (identificationLink) {
      return <Thumbnail square large source={{ uri: identificationLink }} />
    } else {
      return (
        <View style={styles.identificationPlaceholder}>
          <AntDesign name="idcard" color="gray" size={photoSize} />
          {altText && <Text>{altText}</Text>}
        </View>
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
    const {
      firstName,
      lastName,
      phone,
      isReserved,
      dniVerified,
      licenseVerified,
      tripRoutePoints,
      etd,
    } = this.props;

    return (
      <View style={styles.container}>
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
                <Text style={styles.userText}>{`${firstName} ${lastName}`}</Text>
                {isReserved && <Text
                  style={styles.phoneText}
                  onPress={() => Linking.openURL(`tel:${phone}`)}>
                  {phone}
                </Text>}
                {this.renderVerification(dniVerified, 'Usuario verificado')}
                {this.renderVerification(licenseVerified, 'Conductor verificado')}
              </View>
            </View>
          </CardItem>
          <CardItem style={styles.locationContainer}>
            {this.renderLocation(tripRoutePoints)}
          </CardItem>
          <CardItem>
            <TimeInfo timestamp={Date.parse(etd)} isDate />
          </CardItem>
        </Card>
      </View>
    )
  }
}

TripDetails.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  isReserved: PropTypes.bool,
  dniVerified: PropTypes.bool,
  licenseVerified: PropTypes.bool,
  tripRoutePoints: PropTypes.array,
  etd: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
  cardContainer: {
    alignItems: 'flex-start',
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 25,
    padding: 15,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
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
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  userText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  phoneText: {
    color: 'grey',
    fontSize: 14,
    marginLeft: 15,
    marginTop: 3,
  },
  thumbnail: {
    height: photoSize,
    resizeMode: 'center',
    width: photoSize,
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
  }
})

export default TripDetails
