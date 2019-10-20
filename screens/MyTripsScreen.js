import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import MyTrips from '../components/MyTrips/MyTrips'

class MyTripsScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  render() {
    return (
      <View style={styles.container}>
        <MyTrips
          trips={[
            {
              timestamp: 1571590002,
              spacesAvailable: 3,
              key: '0',
            },
            {
              timestamp: 1571503602,
              spacesAvailable: 3,
              key: '1',
            },
            {
              timestamp: 1571586402,
              spacesAvailable: 3,
              key: '2',
            },
            {
              timestamp: 1570985202,
              spacesAvailable: 3,
              key: '3',
            },
            {
              timestamp: 1571593602,
              spacesAvailable: 3,
              key: '4',
            },
            {
              timestamp: 1571676402,
              spacesAvailable: 3,
              key: '5',
            },
            {
              timestamp: 1572194802,
              spacesAvailable: 3,
              key: '6',
            },
            {
              timestamp: 1571590002,
              spacesAvailable: 3,
              key: '7',
            },
            {
              timestamp: 1571590002,
              spacesAvailable: 3,
              key: '8',
            },
          ]}
        />
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
