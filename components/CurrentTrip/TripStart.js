import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from './StopsList'
import { urls } from '../../config/api/index'
import { client } from '../../redux/store'


const TripStart = ({ stops = [], tripId, token, onPressStartTrip }) => {
  async function startTrip(token) {
    await client
      .request({
        method: 'post',
        url: urls.driver.trips.post.next(tripId),
        headers: {
          Authorization: token,
        },
      })
      .then(resp => resp.data)
    onPressStartTrip()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Llego en 5</Text>
      <Text>Paradas:</Text>
      <StopsList stops={stops} />
      <Button 
        style={styles.button}
        onPress={() => startTrip(token)}
      >
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
