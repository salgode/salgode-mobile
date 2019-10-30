import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopIcon, { STOP_ICON_TYPES } from './StopIcon'
import Colors from '../../constants/Colors'
import UserToPickUp from './UserToPickUp'
import StopsList from './StopsList'

class CurrentStop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: this.props.trip,
      tripManifest: this.props.tripManifest,
      stopIndex: this.props.stopIndex,
      before: this.props.before,
      after: this.props.after,
      onPressCompleteTrip: this.props.onPressCompleteTrip,
      nextStopText: 'Siguiente Parada',
    }

    this.goToNextStop = this.goToNextStop.bind(this)
  }

  getUsersToPickUp() {
    return this.state.tripManifest.passengers.filter(passenger => {
      return (
        passenger.trip_route.start ===
        this.state.trip.trip_route_points[this.state.stopIndex].name
      )
      //podria usarse el numero de parada, pero creo que este esto es mas general (y mas claro)
    })
  }

  goToNextStop() {
    //pending before/after changes, see --> StopIcon for more details
    //if(is first stop) {}
    //if(stopIndex == 0) {

    //}
    //if(is last stop) {}
    if (this.state.stopIndex === this.state.trip.trip_route_points.length - 1) {
      this.goToLastStop()
    }
    //if(is mid stop) {}
    else {
      const stopIndex = this.state.stopIndex
      this.setState({
        stopIndex: stopIndex + 1,
      })
      // TODO: change with after variable to check end of trip
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
      return (
        <View style={styles.container}>
          <Text style={styles.title}>#Llego en 5</Text>
          <View style={styles.roadContainer}>
            <StopIcon type={this.state.before} />
            <View style={styles.bar} />
            <StopIcon type={this.state.after} />
          </View>
          <Text style={styles.location}>
            {this.state.trip.trip_route_points[this.state.stopIndex].name}
          </Text>
          <View>
            <Text style={styles.pickup}>Recoge a:</Text>
            <ScrollView style={styles.userContainer}>
              {this.getUsersToPickUp().map((passenger, i) => (
                <UserToPickUp
                  phone={passenger.passenger_phone}
                  name={passenger.passenger_name}
                  location={
                    passenger.trip_route.start
                  } /*la location no esta demas? porque solo se muestran las personas a recoger en la parada actual. o es la location a la cual quieren llegar?*/
                  key={i}
                />
              ))}
            </ScrollView>
            <Button style={styles.button} onPress={this.goToNextStop}>
              <Text>{this.state.nextStopText}</Text>
            </Button>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>#BuenViaje</Text>
        <Text style={styles.pickup}>La ruta:</Text>
        <StopsList stops={this.props.trip.trip_trip_route_points} />

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
  before: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
  after: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
  // location: PropTypes.string.isRequired,
  usersToPickUp: PropTypes.array,
  asDriver: PropTypes.bool.isRequired,
  trip: PropTypes.object.isRequired,
  tripManifest: PropTypes.object.isRequired,
  stopIndex: PropTypes.number.isRequired,
  onPressCompleteTrip: PropTypes.func.isRequired,
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
    margin: '10%',
  },
})

export default CurrentStop
