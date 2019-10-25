import React, { Component } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopIcon, { STOP_ICON_TYPES } from './StopIcon'
import Colors from '../../constants/Colors'
import UserToPickUp from './UserToPickUp'

class CurrentStop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trip: this.props.trip,
      tripManifest: this.props.tripManifest,
      stopIndex: this.props.stopIndex,
      before: this.props.before,
      after: this.props.after,
    };

    this.goToNextStop = this.goToNextStop.bind(this);
    this.getUsersToPickUp = this.getUsersToPickUp.bind(this);
  }

  getUsersToPickUp() {
    return this.state.tripManifest.passengers.filter((passenger) => {
      return passenger.trip_route.start.name == this.state.trip.trip_route_points[this.state.stopIndex].name;
      //podria usarse el numero de parada, pero creo que este esto es mas general (y mas claro)
    })
  }

  goToNextStop() {
    //pending before/after changes, see --> StopIcon for more details
    //if(is first stop) {}
    //if(stopIndex == 0) {

    //}
    //if(is last stop) {}
    if(this.state.stopIndex == this.state.trip.trip_route_points.length - 1) {
      this.goToLastStop();
    }
    //if(is mid stop) {}
    else {
      this.setState({
        stopIndex: this.state.stopIndex+1,
      })
    }
  }

  goToLastStop() {
    //change screen to last stop according to mock file
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>#Llego en 5</Text>
        <View style={styles.roadContainer}>
          <StopIcon type={this.state.before} />
          <View style={styles.bar} />
          <StopIcon type={this.state.after} />
        </View>
        <Text style={styles.location}>{this.state.trip.trip_route_points[this.state.stopIndex].name}</Text>
        <Text style={styles.pickup}>Recoge a:</Text>
        <ScrollView style={styles.userContainer}>
          {this.getUsersToPickUp().map((passenger, i) => (
            <UserToPickUp name={passenger.passenger_name}
            location={passenger.trip_route.start.name} /*la location no esta demas? porque solo se muestran las personas a recoger en la parada actual. o es la location a la cual quieren llegar?*/
            key={i} />
          ))}
        </ScrollView>
        <Button style={styles.button} onPress={this.goToNextStop}>
          <Text>Siguiente Parada</Text>
        </Button>
      </View>
    );
  }
}

CurrentStop.propTypes = {
  before: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
  after: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
  location: PropTypes.string.isRequired,
  usersToPickUp: PropTypes.array,
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
