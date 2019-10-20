import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'

class ChooseTripsScreen extends Component {
  static navigationOptions = {
    title: 'Pedir Viaje',
  }

  render() {
    return (
      <View style={styles.container}>
        <ChooseTrips
          trips={[
            {
              timestamp: 1571590002,
              spacesUsed: 3,
              key: '0',
              user: {
                name: 'Thomas Brahm',
                reputation: 10,
              },
            },
            {
              timestamp: 1571503602,
              spacesUsed: 3,
              key: '1',
              user: {
                name: 'Thomas Brahm',
                reputation: 10,
              },
            },
            {
              timestamp: 1571586402,
              spacesUsed: 3,
              key: '2',
              user: {
                name: 'Thomas Brahm',
                reputation: 10,
              },
            },
            {
              timestamp: 1570985202,
              spacesUsed: 3,
              key: '3',
              user: {
                name: 'Thomas Brahm',
                reputation: 10,
              },
            },
            {
              timestamp: 1571593602,
              spacesUsed: 3,
              key: '4',
              user: {
                name: 'Thomas Brahm',
                reputation: 10,
              },
            },
            {
              timestamp: 1571676402,
              spacesUsed: 3,
              key: '5',
              user: {
                name: 'Thomas Brahm',
                reputation: 10,
              },
            },
          ]}
        />
      </View>
    )
  }
}

ChooseTripsScreen.propTypes = {
  isRequestedTrips: PropTypes.bool,
}

ChooseTripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

export default ChooseTripsScreen
