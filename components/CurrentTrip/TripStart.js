import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from './StopsList'

const TripStart = ({ stops = [] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Llego en 5</Text>
      <Text>Paradas:</Text>
      <StopsList stops={stops} />
      <Button style={styles.button}>
        <Text>Iniciar viaje</Text>
      </Button>
    </View>
  )
}

TripStart.propTypes = {
  stops: PropTypes.array,
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: '10%',
  },
})

export default TripStart
