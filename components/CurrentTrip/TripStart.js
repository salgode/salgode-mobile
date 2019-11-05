import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from './StopsList'

const TripStart = ({ stops = [], onTripStart, nextTripView }) => {
  console.log(stops)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Partimos</Text>
      <Text>Paradas:</Text>
      <StopsList stops={stops} />
      <Button
        style={styles.button}
        onPress={() => {
          onTripStart().then(response => {
            if (response.error) {
              Alert.alert(
                'Error al iniciar Viaje',
                'Hubo un problema iniciando su viaje. Por favor inténtalo de nuevo.'
              )
            } else {
              nextTripView()
            }
          })
        }}
      >
        <Text>Iniciar viaje</Text>
      </Button>
    </View>
  )
}

TripStart.propTypes = {
  stops: PropTypes.array,
  onTripStart: PropTypes.func.isRequired,
  nextTripView: PropTypes.func.isRequired,
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
