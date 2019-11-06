import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopIcon from './StopIcon'
import Colors from '../../constants/Colors'
import UserToPickUp from './UserToPickUp'
import StopsList from './StopsList'

class CurrentStop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: this.props.trip,
      stopIndex: this.props.stopIndex,
      onPressCompleteTrip: this.props.onPressCompleteTrip,
      nextStopText: 'Siguiente Parada',
    }

    this.goToNextStop = this.goToNextStop.bind(this)
    this.getUsersToPickUp = this.getUsersToPickUp.bind(this)
    this.goToLastStop = this.goToLastStop.bind(this)
  }

  getUsersToPickUp() {
    return this.state.trip.manifest
      ? this.state.trip.manifest.passengers.filter(passenger => {
          return (
            passenger.trip_route.start ===
            this.state.trip.trip_route_points[this.state.stopIndex].place_name
          )
          //podria usarse el numero de parada, pero creo que este esto es mas general (y mas claro)
        })
      : []
  }

  goToNextStop() {
    //pending before/after changes, see --> StopIcon for more details
    //if(is first stop) {}
    //if(stopIndex == 0) {

    if (this.state.stopIndex === this.state.trip.trip_route_points.length - 1) {
      this.goToLastStop()
    } else {
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
      return (
        <View style={styles.container}>
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
          <Text style={styles.location}>
            {this.state.trip.trip_route_points[this.state.stopIndex].place_name}
          </Text>
          <View>
            <Text style={styles.pickup}>Recoge a:</Text>
            <ScrollView style={styles.userContainer}>
              {this.state.trip.manifest &&
                (this.state.trip.manifest.passengers.length > 0 ? (
                  this.getUsersToPickUp().map((passenger, i) => (
                    <UserToPickUp
                      phone={passenger.passenger_phone}
                      name={passenger.passenger_name}
                      location={
                        passenger.trip_route.start
                      } /*la location no esta demas? porque solo se muestran las personas a recoger en la parada actual. o es la location a la cual quieren llegar?*/
                      key={i}
                    />
                  ))
                ) : (
                  <Text>No tienes que recoger a nadie</Text>
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
