import React, { Component } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import MyTrip from './Trip/Trip'
import RequestedTrip from './Trip/RequestedTrip'

class MyTrips extends Component {
  constructor(props) {
    super(props)
    this.Trip = this.props.isRequestedTrips ? RequestedTrip : MyTrip
    this.asDriver = this.props.isRequestedTrips ? false : true
  }

  render() {
    const Trip = this.Trip
    return (
      <SafeAreaView>
        <FlatList
          data={this.props.trips}
          renderItem={({ item }) => (
            <Trip
              timestamp={item.timestamp}
              spacesUsed={item.spacesUsed}
              user={item.user}
              status={item.status}
              asDriver={this.asDriver}
              onPressTrip={this.props.onPressTrip}
              tripId={item.tripId}
            />
          )}
          keyExtractor={item => item.tripId}
        />
      </SafeAreaView>
    )
  }
}

MyTrips.propTypes = {
  trips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onPressTrip: PropTypes.func.isRequired,
}

MyTrips.defaultProps = {
  trips: [],
  isRequestedTrips: false,
}

export default MyTrips
