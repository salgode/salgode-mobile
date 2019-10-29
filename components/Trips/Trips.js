import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import MyTrip from './Trip/Trip'
import RequestedTrip from './Trip/RequestedTrip'
import { View, Text } from 'native-base'
class MyTrips extends Component {
  constructor(props) {
    super(props)
    this.Trip = this.props.isRequestedTrips ? RequestedTrip : MyTrip
    this.tripsData = this.props.isRequestedTrips
      ? this.props.driverTrips
      : this.props.trips
    this.asDriver = this.props.isRequestedTrips ? false : true
  }

  render() {
    const Trip = this.Trip
    // console.log(this.props.trips.filter(t => t.etd_info))

    if (this.props.trips) {
      return (
        <SafeAreaView>
          <FlatList
            data={this.props.trips.filter(t => t.etd_info)}
            renderItem={({ item }) => {
              return (
                <Trip
                  timestamp={item.etd_info.etd}
                  spacesUsed={item.spacesUsed}
                  user={item.driver}
                  status={item.trip_status}
                  asDriver={this.asDriver}
                  onPressTrip={this.props.onPressTrip}
                  trip={item}
                  startLocation={item.trip_route.start}
                  endLocation={item.trip_route.end}
                />
              )
            }}
            keyExtractor={item => item.trip_id}
          />
        </SafeAreaView>
      )
    }
    return (
      <View style={styles.viewContainer}>
        {this.props.isRequestedTrips ? (
          <Text>No haz agendado Viajes 🚗</Text>
        ) : (
            <Text>No tienes Viajes pendientes 🚘</Text>
          )}
      </View>
    )
  }
}

MyTrips.propTypes = {
  trips: PropTypes.array,
  driverTrips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onPressTrip: PropTypes.func.isRequired,
}

MyTrips.defaultProps = {
  trips: [],
  driverTrips: [],
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default MyTrips
