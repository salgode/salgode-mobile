import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Trip from '../components/MyTrips/Trip/Trip'

class MyTripsScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  render() {
    return (
      <View style={styles.container}>
        <Trip timestamp={Date.now()} />
      </View>
    )
  }
}

MyTripsScreen.propTypes = {}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

export default MyTripsScreen
