/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet, Platform, Linking } from 'react-native'
import { Card, View, Text, Button, CardItem, Thumbnail } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
/*import Colors from '../../../constants/Colors'*/
import { Ionicons } from '@expo/vector-icons'
import { client } from '../../../redux/store'

export default class TripRequestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passenger: null,
      finishStop: null,
      slot: null,
      body: {
        decline_reason: 'out_of_space',
        decline_message: "I'm sorry, got a last minute friend on board",
      },
    }
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  componentDidMount() {
    this.setState({
      passenger: this.props.passenger,
      finalLocation: this.props.finalLocation,
      finishStop: this.props.finishStop,
      slot: this.props.slot,
    })
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
      const slot = prevState.slot
      slot.slot_status = status
      return { slot }
    })

    const requestObject = {
      method: 'post',
      url: `/reservations/${this.state.slot.slot_id}/
      ${status === 'accepted' ? 'accept' : 'decline'}`,
      headers: {
        Authorization: this.props.token,
      },
    }

    if (status !== 'accepted') {
      requestObject.data = this.state.body
    }

    await client
      .request(requestObject)
      .then(resp => {
        console.warn(this.props.token)
        console.warn('RESERVATION')
        console.warn(resp)
      })
      .catch(err => {
        console.warn(this.props.token)
        console.warn('RESERVATION')
        console.warn(err)
      })

    // TODO: fix 403
  }

  render() {
    /*const { finalLocation } = this.state*/
    // console.log('SLOT', this.state.slot)
    const selfieImage =
      this.state.passenger != null ? this.state.passenger.avatar : 'placeholder'

    // console.log(this.state.passenger)
    return this.state.passenger !== null && this.state.slot ? (
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
              {this.state.passenger.first_name} {this.state.passenger.last_name}
            </Text>
          </View>
        </CardItem>

        <CardItem style={styles.locationContainer}>
          <Location
            color={'#0000FF'}
            location={
              this.state.slot ? this.state.slot.route_point.name : 'cargando..'
            }
          />
          <Location
            color={
              /*finalLocation === this.state.passenger.finish
                ? '#33C534'
                : Colors.textGray*/
              '#33C534'
            }
            location={this.state.finishStop}
          />
        </CardItem>

        {this.state.slot.slot_status === 'pending' && (
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

        {this.state.slot.slot_status === 'accepted' && (
          <View style={styles.buttonsContainer}>
            <Button
              style={{ ...styles.buttonTrip, backgroundColor: 'green' }}
              onPress={() => this.dialCall(this.state.passenger.phone)}
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
        {this.state.slot.slot_status === 'rejected' && (
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
    ) : null
  }
}

TripRequestCard.propTypes = {
  passenger: PropTypes.object.isRequired,
  finalLocation: PropTypes.string,
  finishStop: PropTypes.string,
  slot: PropTypes.object,
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
