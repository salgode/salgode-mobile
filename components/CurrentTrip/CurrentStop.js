import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopIcon from './StopIcon'
import Colors from '../../constants/Colors'
import UserToPickUp from './UserToPickUp'
import StopsList from './StopsList'
import UserCard from './UserCard'

class CurrentStop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: this.props.trip,
      stopIndex: this.props.stopIndex > 0 ? this.props.stopIndex - 1 : 0,
      onPressCompleteTrip: this.props.onPressCompleteTrip,
      nextStopText: 'Siguiente Parada',
    }

    this.goToNextStop = this.goToNextStop.bind(this)
    this.getUsersToPickUp = this.getUsersToPickUp.bind(this)
    this.goToLastStop = this.goToLastStop.bind(this)
  }

  getUsersToPickUp() {
    const { trip, stopIndex } = this.state
    return trip.manifest
      ? trip.manifest.passengers.filter(passenger => {
          return (
            passenger.trip_route.start.place_id ===
            trip.trip_route_points[stopIndex].place_id
          )
          //podria usarse el numero de parada, pero creo que este esto es mas general (y mas claro)
        })
      : []
  }

  goToNextStop() {
    if (this.state.stopIndex === this.state.trip.trip_route_points.length - 1) {
      this.goToLastStop()
    } else {
      this.props.onPressNextStop(this.state.trip.trip_id)

      const stopIndex = this.state.stopIndex
      this.setState({
        stopIndex: stopIndex + 1,
      })
      if (stopIndex + 1 === this.state.trip.trip_route_points.length - 1) {
        this.setState({
          nextStopText: 'Terminar Viaje',
        })
      }
    }
  }

  goToLastStop() {
    //change screen to last stop according to mock file
    this.state.onPressCompleteTrip(this.state.trip)
  }

  render() {
    if (this.props.asDriver) {
      const passengers = this.getUsersToPickUp()
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>#Llego en 5</Text>
          <View style={styles.roadContainer}>
            <StopIcon type={this.state.stopIndex === 0 ? 0 : 1} />
            <View style={styles.bar} />
            <StopIcon
              type={
                this.state.stopIndex ===
                this.state.trip.trip_route_points.length - 1
                  ? 2
                  : 1
              }
            />
          </View>
          <Text style={styles.pickup}>Proxima parada:</Text>
          <Text style={styles.location}>
            {this.state.trip.trip_route_points[this.state.stopIndex].place_name}
          </Text>
          <View>
            <Text style={styles.pickup}>Recoge a:</Text>
            <ScrollView style={styles.userContainer}>
              {passengers.length > 0 ? (
                passengers.map((passenger, i) => (
                  <UserCard
                    avatar={passenger.passenger_avatar}
                    phone={passenger.passenger_phone}
                    name={passenger.passenger_name}
                    key={i}
                  />
                ))
              ) : (
                <Text>No tienes que recoger a nadie</Text>
              )}
            </ScrollView>
            <Button style={styles.button} onPress={this.goToNextStop}>
              <Text>{this.state.nextStopText}</Text>
            </Button>
          </View>
        </ScrollView>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>#BuenViaje</Text>
        <Text style={styles.pickup}>La ruta:</Text>
        <StopsList stops={this.props.trip.trip_route_points} />

        <View>
          <Text style={styles.pickup}>Te lleva:</Text>
          <ScrollView style={styles.userContainer}>
            <UserToPickUp
              phone={this.props.trip.driver.driver_phone}
              name={this.props.trip.driver.driver_name}
              location=""
            />
          </ScrollView>
        </View>
      </View>
    )
  }
}

CurrentStop.propTypes = {
  usersToPickUp: PropTypes.array,
  asDriver: PropTypes.bool.isRequired,
  trip: PropTypes.object.isRequired,
  stopIndex: PropTypes.number.isRequired,
  onPressCompleteTrip: PropTypes.func.isRequired,
  onPressNextStop: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.textGray,
    height: 5,
    marginRight: '8%',
    width: '80%',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 10,
    height: '10%',
    justifyContent: 'center',
    width: '70%',
  },
  container: {
    padding: '10%',
    ...StyleSheet.absoluteFillObject,
  },
  location: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: '10%',
  },
  pickup: {
    color: Colors.textGray,
    fontSize: 20,
  },
  roadContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '2%',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: '10%',
  },
  userContainer: {
    height: '40%',
    margin: '2%',
    // marginBottom: '0%',
  },
})

export default CurrentStop
