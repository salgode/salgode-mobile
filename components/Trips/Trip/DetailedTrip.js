import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem, Button, Thumbnail } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import TimeInfo from './TimeInfo'
import { Ionicons } from '@expo/vector-icons'

export const DetailedTrip = ({ trip, asDriver, driver, token }) => {
  function renderLocation(locations) {
    return locations.map((location, index) => {
      let color
      if (index === 0) {
        color = '#0000FF'
      } else if (index === locations.length - 1) {
        color = '#33C534'
      } else {
        color = Colors.textGray //index === locations.length - 1 ? '#33C534'
      }
      return (
        <Location
          key={`location-${index}`}
          color={color}
          location={location.name}
        />
      )
    })
  }

  function startTrip(token) {
    // TODO: connect to server
    // TODO: navigate to current trip screen
    // eslint-disable-next-line no-console
    console.log('trip!', token)
  }

  const selfieImage = driver != null ? driver.avatar : 'placeholder'

  return trip != null ? (
    <Card
      style={{
        ...styles.container,
        ...styles.shadow,
      }}
    >
      <View style={styles.userData}>
        <Text style={styles.userText}>Resumen Viaje</Text>
      </View>
      <CardItem>
        {/* TODO: if  as driver, don't show name and thumbnail*/}
        <View style={styles.user}>
          {selfieImage && selfieImage !== 'placeholder' ? (
            <Thumbnail source={{ uri: selfieImage }} />
          ) : (
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
              size={40}
            />
          )}
          <Text style={styles.userText}>
            {driver.first_name} {driver.last_name}
          </Text>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        {renderLocation(trip.trip_route_points)}
      </CardItem>
      <CardItem>
        <TimeInfo timestamp={Date.parse(trip.etd)} isDate />
      </CardItem>
      {asDriver ? (
        <Button
          style={{ alignSelf: 'center', backgroundColor: '#0000FF' }}
          onPress={() => startTrip(token)}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
            Iniciar Viaje
          </Text>
        </Button>
      ) : null}
    </Card>
  ) : null
}

DetailedTrip.propTypes = {
  trip: PropTypes.object,
  asDriver: PropTypes.bool,
  driver: PropTypes.object,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 25,
    padding: 15,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  shadow: {
    shadowColor: '#b3b3b3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userData: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userText: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
  },
})

export default DetailedTrip
