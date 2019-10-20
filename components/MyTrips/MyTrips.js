import React, { Component } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import Trip from './Trip/Trip'

class MyTrips extends Component {
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={this.props.trips}
          renderItem={({ item }) => (
            <Trip
              timestamp={item.timestamp}
              spacesAvailable={item.spacesAvailable}
            />
          )}
        />
      </SafeAreaView>
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
