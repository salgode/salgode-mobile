import React, { Component } from 'react'
import { StyleSheet, Platform, Linking, ScrollView } from 'react-native'
import { Card, CardItem, View, Text, Thumbnail, Button } from 'native-base'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'
import TimeInfo from './TimeInfo'
import Location from './Location'
import SalgoDeMap from '../../SalgoDeMap'
import Colors from '../../../constants/Colors'

const photoSize = 96

class TripDetails extends Component {
  constructor(props) {
    super(props)
    this.readonlyField = this.readonlyField.bind(this)
    this.renderLocation = this.renderLocation.bind(this)
    this.renderIdentification = this.renderIdentification.bind(this)
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
        <Location
          key={`location-${index}`}
          color={color}
          location={location.place_name}
        />
      )
    })
  }

  renderIdentification(identificationLink, altText = '') {
    if (identificationLink) {
      return <Thumbnail large source={{ uri: identificationLink }} />
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

  render() {
    const {
      firstName,
      phone,
      isReserved,
      dniVerified,
      licenseVerified,
      tripRoutePoints,
      etd,
      vehicle,
    } = this.props
    return (
      <ScrollView style={styles.container}>
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
                <Text style={styles.userText}>{`${firstName}`}</Text>
                {isReserved && (
                  <Text
                    style={styles.phoneText}
                    onPress={() => this.dialCall(phone)}
                  >
                    {phone}
                  </Text>
                )}
                {this.renderVerification(dniVerified, 'Usuario verificado ')}
                {this.renderVerification(
                  licenseVerified,
                  'Conductor verificado '
                )}
              </View>
            </View>
          </CardItem>
          <CardItem style={styles.locationContainer}>
            {this.renderLocation(tripRoutePoints)}
          </CardItem>
          <CardItem style={styles.mapView}>
            <SalgoDeMap
              markers={tripRoutePoints}
              showPath
              path={tripRoutePoints}
              showDescription
              start={tripRoutePoints[0]}
              end={tripRoutePoints.slice(-1)[0]}
              goToMarkers
            />
          </CardItem>
          <CardItem>
            <TimeInfo timestamp={Date.parse(etd)} isDate />
          </CardItem>
          {isReserved && vehicle && (
            <>
              <CardItem>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                  Datos del vehículo
                </Text>
              </CardItem>
              <CardItem>
                <Text>Patente: {vehicle.vehicle_identification}</Text>
              </CardItem>
              <CardItem>
                <Text>Color: {vehicle.vehicle_color}</Text>
              </CardItem>
            </>
          )}
          {isReserved && (
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
          )}
        </Card>
        <View style={{ height: 30 }} />
      </ScrollView>
    )
  }
}

TripDetails.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  isReserved: PropTypes.bool,
  dniVerified: PropTypes.bool,
  licenseVerified: PropTypes.bool,
  tripRoutePoints: PropTypes.array.isRequired,
  etd: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  buttonTrip: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  cardContainer: {
    alignItems: 'flex-start',
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 25,
    paddingVertical: 15,
  },
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  mapView: {
    height: 200,
    width: '100%',
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

export default TripDetails
