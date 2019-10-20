import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Trip from '../components/MyTrips/Trip/Trip'
import MyTrips from '../components/MyTrips/MyTrips'

class MyTripsScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  render() {
    return (
      <View style={styles.container}>
        <MyTrips />
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
