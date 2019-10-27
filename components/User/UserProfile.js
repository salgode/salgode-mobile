import React, { Component } from 'react'
import { StyleSheet, Linking } from 'react-native'
import { Card, CardItem, View, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons, AntDesign, Octicons } from '@expo/vector-icons'
import TimeInfo from '../../components/Trips/Trip/TimeInfo'
import Location from '../../components/Trips/Trip/Location'
import Colors from '../../constants/Colors'

const photoSize = 96

class UserProfile extends Component {
  static navigationOptions = {
    title: 'Detalle Viaje',
  }

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
    const { navigation } = this.props
    const { avatar } = navigation.state.params.userData
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
    const { navigation } = this.props
    const { userData } = navigation.state.params

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
              <View style={{flexDirection: 'column', alignSelf: 'flex-start'}}>
                <Text style={styles.userText}>{`${userData.first_name} ${userData.last_name}`}</Text>
                {userData.isAccepted && <Text
                  style={styles.phoneText}
                  onPress={() => Linking.openURL(`tel:${userData.phone}`)}>
                  {userData.phone}
                </Text>}
                {this.renderVerification(userData.dniVerified, 'Usuario verificado')}
                {this.renderVerification(userData.licenceVerified, 'Conductor verificado')}
              </View>
            </View>
          </CardItem>
          <CardItem style={styles.locationContainer}>
            {this.renderLocation(userData.trip_route_points)}
          </CardItem>
          <CardItem>
            <TimeInfo timestamp={Date.parse(userData.etd_info.etd)} isDate />
          </CardItem>
        </Card>
      </View>
    )
  }
}

UserProfile.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }).isRequired,
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
  userData: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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

export default UserProfile
