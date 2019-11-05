import React from 'react'
import { StyleSheet, Alert, ScrollView } from 'react-native'
import { View, Text, Button, Card, CardItem, Spinner } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from './StopsList'
import UserCard from './UserCard'

const TripStart = ({ stops = [], onTripStart, nextTripView, startPassengers }) => {
  const [loadingStart, setLoadingStart] = React.useState(false)
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>#Partimos</Text>
      <Text>Paradas:</Text>
      <StopsList stops={stops} />
      {(startPassengers.length !== 0) && (
        <>
          <Text style={{ marginBottom: 10 }}>
            Recuerda pasar a buscar a los siguientes pasajeros en tu punto de partida
          </Text>
          <View style={{ marginBottom: 20 }}>
            {startPassengers.map((passenger, index) => {
              const { passenger_avatar, passenger_name, passenger_phone } = passenger
              return (
                <UserCard
                  avatar={passenger_avatar}
                  name={passenger_name}
                  phone={passenger_phone}
                />
              )
            })}
          </View>
        </>
      )}
      {loadingStart ? (
        <Spinner color="blue" />
      ) : (
        <Button
          style={styles.button}
          onPress={() => {
            setLoadingStart(true)
            onTripStart().then(response => {
              if (response.error) {
                setLoadingStart(false)
                Alert.alert(
                  'Error al iniciar Viaje',
                  'Hubo un problema iniciando su viaje. Por favor inténtalo de nuevo.'
                )
              } else {
                setLoadingStart(false)
                nextTripView()
              }
            })
          }}
        >
          <Text>Iniciar viaje</Text>
        </Button>
      )}
      <View style={{ height: 180 }}/>
    </ScrollView>
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
    height: 60,
    justifyContent: 'center',
    width: '70%',
  },
  container: {
    padding: '10%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: '10%',
  },
})

export default TripStart
