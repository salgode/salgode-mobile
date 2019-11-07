import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button, Spinner } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from './StopsList'
import UserCard from './UserCard'

const TripStart = ({
  stops = [],
  onTripStart,
  nextTripView,
  startPassengers,
  canStart,
}) => {
  const [loadingStart, setLoadingStart] = React.useState(false)
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>#Partimos</Text>
      <Text>Paradas:</Text>
      <StopsList stops={stops} />
      {startPassengers.length !== 0 && (
        <>
          <Text style={{ marginBottom: 10 }}>
            Recuerda pasar a buscar a los siguientes pasajeros en tu punto de
            partida
          </Text>
          <View style={{ marginBottom: 20 }}>
            {startPassengers.map((passenger, index) => {
              const {
                passenger_avatar,
                passenger_name,
                passenger_phone,
              } = passenger
              return (
                <UserCard
                  avatar={passenger_avatar}
                  name={passenger_name}
                  phone={passenger_phone}
                  key={index}
                />
              )
            })}
          </View>
        </>
      )}
      {loadingStart ? (
        <Spinner color="blue" />
      ) : (
        <View>
          <Button
            style={styles.button}
            onPress={() => {
              setLoadingStart(true)
              onTripStart()
              setLoadingStart(false)
              nextTripView()
            }}
            disabled={!canStart}
          >
            <Text>Iniciar viaje</Text>
          </Button>
          {canStart ? null : (
            <Text
              style={{
                fontWeight: '200',
                fontSize: 12,
                paddingTop: 10,
                alignSelf: 'center',
              }}
            >
              No puedes inicar viajes mientras tengas uno en progreso
            </Text>
          )}
        </View>
      )}
      <View style={{ height: 180 }} />
    </ScrollView>
  )
}

TripStart.propTypes = {
  stops: PropTypes.array,
  onTripStart: PropTypes.func.isRequired,
  nextTripView: PropTypes.func.isRequired,
  canStart: PropTypes.bool.isRequired,
  startPassengers: PropTypes.array.isRequired,
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
    height: '100%',
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
