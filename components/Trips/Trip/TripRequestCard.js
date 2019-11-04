/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet, Platform, Linking } from 'react-native'
import { Card, View, Text, Button, CardItem, Thumbnail } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
/*import Colors from '../../../constants/Colors'*/
import { Ionicons, Octicons } from '@expo/vector-icons'
//import { client } from '../../../redux/store'
import { getBaseHeaders, urls } from '../../../config/api'
import { shareToWhatsApp } from '../../../utils/whatsappShare'

class TripRequestCard extends Component {
  constructor(props) {
    super(props)
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  dialCall(phoneNumber) {
    let link = ''
    if (Platform.OS === 'android') {
      link = `tel:${phoneNumber}`
    } else {
      link = `telprompt:${phoneNumber}`
    }
    Linking.openURL(link)
  }

  async handleChangeStatus(status) {
    this.setState(prevState => {
      const reservation = { ...prevState.reservation }
      reservation.reservation_status = status
      return { reservation }
    })

    const requestObject = {
      method: 'post',
      headers: getBaseHeaders(this.props.token),
    }

    const { reservation } = this.state
    if (status === 'accepted') {
      requestObject.url = urls.driver.reservations.post.accept(
        reservation.trip_id,
        reservation.reservation_id
      )
    } else {
      requestObject.url = urls.driver.reservations.post.decline(
        reservation.trip_id,
        reservation.reservation_id
      )
    }

    if (status !== 'accepted') {
      requestObject.data = this.state.body
    }
    await client.request(requestObject)
  }

  render() {
    const { reservation, passenger, places, status, trip } = this.props
    console.log(trip)

    if (!reservation || !places || places.length === 0 || !passenger) {
      return <></>
    }

    const { passenger_avatar, passenger_name, passenger_verifications } = passenger

    return (
      <Card style={styles.container}>
        <CardItem>
          <View style={styles.user}>
            {passenger_avatar ? (
              <Thumbnail source={{ uri: passenger_avatar }} />
            ) : (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                size={40}
              />
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userText}>{passenger_name}</Text>
              <View style={styles.verifiedContainer}>
                <Text style={styles.verifiedText}>Usuario verificado </Text>
                <Octicons
                  name={passenger_verifications.identity ? 'verified' : 'unverified'}
                  color={passenger_verifications.identity ? 'green' : 'red'}
                  size={14}
                />
              </View>
            </View>
          </View>
        </CardItem>

        <CardItem style={styles.locationContainer}>
          <Text style={styles.subeEnText}>#Sube en</Text>
          <Location
            color={'#0000FF'}
            location={reservation.reservation_route_places[0].place_name}
          />
        </CardItem>

        {status === 'pending' &&
          this.props.tripStatus === 'open' && (
            <CardItem style={styles.buttonsContainer}>
              <Button
                style={{
                  ...styles.buttonTrip,
                  backgroundColor: '#white',
                  borderColor: '#0000FF',
                  borderWidth: 1,
                }}
                onPress={() => this.handleChangeStatus('accepted')}
              >
                <Text
                  style={{
                    color: '#0000FF',
                    fontSize: 15,
                    fontWeight: '700',
                    alignSelf: 'center',
                  }}
                >
                  Aceptar
                </Text>
              </Button>
              <Button
                bordered
                style={{ ...styles.buttonTrip, borderColor: '#FF5242' }}
                onPress={() => this.handleChangeStatus('rejected')}
              >
                <Text
                  style={{
                    color: '#FF5242',
                    fontSize: 15,
                    fontWeight: '700',
                    alignSelf: 'center',
                  }}
                >
                  Rechazar
                </Text>
              </Button>
            </CardItem>
          )}

        {reservation.reservation_status === 'accepted' && (
          <View style={styles.buttonsContainer}>
            <Button
              style={{ ...styles.buttonTrip, backgroundColor: 'green' }}
              onPress={() =>
                passenger.phone ? this.dialCall(passenger.phone) : null
              }
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '700',
                  alignSelf: 'center',
                }}
              >
                Contactar
              </Text>
            </Button>
            <Button
              style={{ ...styles.buttonTrip, backgroundColor: 'green' }}
              onPress={() =>
                passenger.phone && passenger.phone.includes('+')
                  ? shareToWhatsApp(
                      'Hola! Encontré tu viaje en #Salgode y me sirve mucho',
                      passenger.phone
                    )
                  : null
              }
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '700',
                  alignSelf: 'center',
                }}
              >
                Whatsapp
              </Text>
            </Button>
          </View>
        )}
        {reservation.reservation_status === 'rejected' && (
          <View style={styles.buttonsContainer}>
            <Button style={{ ...styles.buttonTrip, backgroundColor: 'red' }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '700',
                  alignSelf: 'center',
                }}
              >
                Rechazado
              </Text>
            </Button>
          </View>
        )}
      </Card>
    )
  }
}

TripRequestCard.propTypes = {
  reservation: PropTypes.object.isRequired,
  finalLocation: PropTypes.string,
  finishStop: PropTypes.string,
  token: PropTypes.string.isRequired,
  tripStatus: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  buttonTrip: {
    marginHorizontal: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 2,
    flexDirection: 'row',
  },
  container: {
    alignItems: 'flex-start',
    borderRadius: 20,
    flexDirection: 'column',
    padding: 15,
    paddingRight: 0,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  subeEnText: {
    marginBottom: 5,
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  userText: {
    fontSize: 17,
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

export default TripRequestCard
