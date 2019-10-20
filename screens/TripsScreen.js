import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Trips from '../components/Trips/Trips'

class TripsScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  render() {
    return (
      <View style={styles.container}>
        <Trips
          isRequestedTrips={this.props.isRequestedTrips}
          trips={[
            {
              timestamp: 1571590002,
              spacesUsed: 3,
              key: '0',
              user: {
                name: 'Benjamin Earle',
                reputation: 17,
              },
              status: 'accepted',
            },
            {
              timestamp: 1571503602,
              spacesUsed: 3,
              key: '1',
              user: {
                name: 'Benjamin Earle',
                reputation: 17,
              },
              status: 'pending',
            },
            {
              timestamp: 1571586402,
              spacesUsed: 3,
              key: '2',
              user: {
                name: 'Benjamin Earle',
                reputation: 17,
              },
              status: 'rejected',
            },
            {
              timestamp: 1570985202,
              spacesUsed: 3,
              key: '3',
              user: {
                name: 'Benjamin Earle',
                reputation: 17,
              },
              status: 'accepted',
            },
            {
              timestamp: 1571593602,
              spacesUsed: 3,
              key: '4',
              user: {
                name: 'Benjamin Earle',
                reputation: 17,
              },
              status: 'accepted',
            },
            {
              timestamp: 1571676402,
              spacesUsed: 3,
              key: '5',
              user: {
                name: 'Benjamin Earle',
                reputation: 17,
              },
              status: 'accepted',
            },
          ]}
        />
      </View>
    )
  }
}

TripsScreen.propTypes = {
  isRequestedTrips: PropTypes.bool,
}

TripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

export default TripsScreen
