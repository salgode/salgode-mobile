/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet, Platform, Linking } from 'react-native'
import { Card, View, Text, Button, CardItem, Thumbnail } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
/*import Colors from '../../../constants/Colors'*/
import { Ionicons } from '@expo/vector-icons'
import { client } from '../../../redux/store'
import { getBaseHeaders, urls } from '../../../config/api'

export default class TripRequestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reservation: props.reservation,
      body: {
        decline_reason: 'out_of_space',
        decline_message: "I'm sorry, got a last minute friend on board",
      },
    }
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
      requestObject.url = urls.driver.reservations.post.acept(
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
    // console.log(requestObject)
    await client
      .request(requestObject)
      .then(resp => {
        console.log(this.props.token)
        console.log('RESERVATION')
        console.log(resp)
      })
      .catch(err => {
        console.log(this.props.token)
        console.log('RESERVATION')
        console.log(err)
      })

    // TODO: fix 403
  }

  render() {
    const { reservation } = this.state
    // console.log(reservation)
    const { passenger } = this.props.reservation
    const selfieImage = passenger.avatar || 'placeholder'

    // console.log(this.state.passenger)
    if (!reservation) {
      return null
    }
    return (
      <Card style={styles.container}>
        <CardItem>
          <View style={styles.user}>
            {selfieImage && selfieImage !== 'placeholder' ? (
              <Thumbnail source={{ uri: selfieImage }} />
            ) : (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                size={40}
              />
            )}
            <Text style={styles.userText}>
              {passenger.name} {passenger.last_name}
            </Text>
          </View>
        </CardItem>

        <CardItem style={styles.locationContainer}>
          <Location
            color={'#0000FF'}
            location={reservation.reservation_route.start}
          />
          <Location
            color={
              /*finalLocation === this.state.passenger.finish
                ? '#33C534'
                : Colors.textGray*/
              '#33C534'
            }
            location={reservation.reservation_route.end}
          />
        </CardItem>

        {reservation.reservation_status === 'pending' && (
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
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userText: {
    fontSize: 17,
    marginLeft: 15,
  },
})
