/* eslint-disable no-console */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet, Platform, Linking, Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  Card,
  View,
  Text,
  Button,
  CardItem,
  Thumbnail,
  Spinner,
} from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import { Ionicons, Octicons } from '@expo/vector-icons'
import {
  acceptReservation,
  declineReservation,
} from '../../../redux/actions/trips'

class TripRequestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: {
        decline: false,
        accept: false,
      },
    }
    this.body = {
      decline_reason: 'not implemented',
      decline_message: 'not implemented',
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
    const {
      fetchAcceptReservation,
      fetchDeclineReservation,
      trip,
      reservation,
      user,
      updateReservations,
    } = this.props
    let response
    let alertTitle = 'Problemas al procesar la solicitud'
    let alertMessage =
      'No se pudo completar con éxito la solicitud. Por favor intenta de nuevo'
    switch (status) {
      case 'accepted':
        alertTitle = 'Problemas al aceptar la reserva'
        alertMessage =
          'No se pudo aceptar la reserva. Por favor intenta de nuevo.'
        this.setState({ loading: { ...this.state.loading, accept: true } })
        response = await fetchAcceptReservation(
          user.token,
          trip.trip_id,
          reservation.reservation_id
        )
        this.setState({ loading: { ...this.state.loading, accept: false } })
        break
      case 'declined':
        alertTitle = 'Problemas al rechazar la reserva'
        alertMessage =
          'No se pudo rechazar la reserva. Por favor intenta de nuevo.'
        this.setState({ loading: { ...this.state.loading, decline: true } })
        response = await fetchDeclineReservation(
          user.token,
          trip.trip_id,
          reservation.reservation_id,
          this.body
        )
        this.setState({ loading: { ...this.state.loading, decline: false } })
        break
      default:
        console.warn('Invalid status')
    }
    if (response && response.error) {
      Alert.alert(alertTitle, alertMessage)
    } else {
      updateReservations(status, reservation.reservation_id)
    }
  }

  render() {
    const { reservation, passenger, places, status } = this.props
    const { loading } = this.state

    if (!reservation || !places || places.length === 0 || !passenger) {
      return <></>
    }

    const {
      passenger_avatar,
      passenger_name,
      passenger_verifications,
    } = passenger

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
              {passenger_verifications.identity ? (
                <View style={styles.verifiedContainer}>
                  <Text style={styles.verifiedText}>Usuario verificado </Text>
                  <Octicons
                    name={
                      passenger_verifications.identity
                        ? 'verified'
                        : 'unverified'
                    }
                    color={passenger_verifications.identity ? 'green' : 'red'}
                    size={14}
                  />
                </View>
              ) : null}
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

        {status === 'pending' && (
          <CardItem style={styles.buttonsContainer}>
            {loading.accept ? (
              <View style={styles.buttonTrip}>
                <Spinner color="blue" />
              </View>
            ) : (
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
            )}
            {loading.decline ? (
              <View style={styles.buttonTrip}>
                <Spinner color="blue" />
              </View>
            ) : (
              <Button
                bordered
                style={{ ...styles.buttonTrip, borderColor: '#FF5242' }}
                onPress={() => this.handleChangeStatus('declined')}
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
            )}
          </CardItem>
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
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10,
    textAlign: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    display: "flex",
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

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchAcceptReservation: (token, tripId, resId) =>
    dispatch(acceptReservation(token, tripId, resId)),
  fetchDeclineReservation: (token, tripId, resId, data) =>
    dispatch(declineReservation(token, tripId, resId, data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripRequestCard)
