import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Trip from './Trip/Trip'

class MyTrips extends Component {
  render() {
    return (
      <View>
        {this.props.trips.map((trip, i) => (
          <Trip
            timestamp={trip.timestamp}
            spacesAvailable={trip.spacesAvailable}
            key={i}
          />
        ))}
        <Trip
          timestamp={Date.now()}
          spacesAvailable={Math.floor(4 * Math.random())}
        />
      </View>
    )
  }
}

MyTrips.propTypes = {
  trips: PropTypes.array,
}

MyTrips.defaultProps = {
  trips: [],
}

export default MyTrips
