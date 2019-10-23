/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react'
import { StyleSheet, Platform, Linking } from 'react-native'
import { Card, View, Text, Button, CardItem } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default class TripRequestCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      passenger: null,
    }
    this.handleChangeStatus = this.handleChangeStatus.bind(this)
  }

  componentDidMount() {
    this.setState({
      passenger: this.props.passenger,
      finalLocation: this.props.finalLocation,
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

  handleChangeStatus(status) {
    this.setState(prevState => {
      const passenger = prevState.passenger
      passenger.status = status
      return { passenger }
    })
    // TODO: connect to server
    // axios.fetch(api, status) or something like that :)
  }

  render() {
    const { finalLocation } = this.state
    return this.state.passenger != null &&
      this.state.passenger.status !== 'rejected' ? (
      <Card style={styles.container}>
        <CardItem>
          <View style={styles.user}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
              size={40}
            />
            <Text style={styles.userText}>{this.state.passenger.name}</Text>
          </View>
        </CardItem>

        <CardItem style={styles.locationContainer}>
          <Location color={'#0000FF'} location={this.state.passenger.start} />
          <Location
            color={
              finalLocation === this.state.passenger.finish
                ? '#33C534'
                : Colors.textGray
            }
            location={this.state.passenger.finish}
          />
        </CardItem>

        {this.state.passenger.status === 'pending' && (
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

        {this.state.passenger.status === 'accepted' && (
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonsContainerSpacer}></View>
            <View style={styles.buttonsContainer}>
              <Button
                style={{
                  ...styles.buttonTrip,
                  backgroundColor: 'green',
                  alignSelf: 'flexEnd',
                }}
                onPress={() => this.dialCall(this.state.passenger.phoneNumber)}
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
          </View>
        )}

        {this.state.passenger.status === 'rejected' && null}
      </Card>
    ) : null
  }
}

TripRequestCard.propTypes = {
  passenger: PropTypes.object.isRequired,
  finalLocation: PropTypes.string,
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
  buttonsContainerSpacer: {
    flex: 3,
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
