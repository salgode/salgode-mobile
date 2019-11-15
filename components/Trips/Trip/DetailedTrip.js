import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem, Button, Thumbnail, Spinner } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import TimeInfo from './TimeInfo'
import SalgoDeMap from '../../SalgoDeMap'
import { Ionicons } from '@expo/vector-icons'

// TODO: Delete this function
const fakePlaces = (spots) => {
  let final = []
  if (spots && spots.length >= 3) {
    for (let i in [1,2,3]) {
      final.push(spots[i])
    }
    Object.assign(final[0], {
      lat: -33.43178,
      lon: -70.5453808,
    })
    Object.assign(final[1], {
      lat: -33.4469777,
      lon: -70.6298197,
    })
    Object.assign(final[2], {
      lat: -33.69526,
      lon: -71.214668,
    })
  }
  return final
}

export const DetailedTrip = ({
  trip,
  asDriver,
  driver,
  onPressStartTrip,
  toCurrentTrip,
  fetchingPassengers,
}) => {
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
          location={location.place_name}
        />
      )
    })
  }

  const [loadingButton, setLoadingButton] = React.useState(false)

  const selfieImage = driver != null ? driver.driver_avatar : 'placeholder'

  // TODO: Delete this fake
  const fakeRoute = fakePlaces(trip.trip_route_points)

  return trip !== null ? (
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
        {!asDriver ? (
          <View style={styles.user}>
            {selfieImage && selfieImage !== 'placeholder' ? (
              <Thumbnail source={{ uri: selfieImage }} />
            ) : (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                size={40}
              />
            )}
            <Text style={styles.userText}>{driver.driver_name}</Text>
          </View>
        ) : (
          <></>
        )}
      </CardItem>
      <CardItem style={styles.locationContainer}>
        {renderLocation(trip.trip_route_points)}
      </CardItem>
      <CardItem style={styles.mapView}>
        <SalgoDeMap
          markers={fakeRoute}
          showPath
          path={fakeRoute}
          showDescription
          start={fakeRoute[0]}
          end={fakeRoute.slice(-1)[0]}
          allowInteraction={false}
        />
      </CardItem>
      <CardItem>
        <TimeInfo timestamp={Date.parse(trip.etd_info.etd)} />
      </CardItem>
      {asDriver && trip.trip_status === 'in_progress' && (
        <CardItem>
          <Text>Tu viaje ya comenzó!</Text>
        </CardItem>
      )}
      {asDriver && trip.trip_status === 'completed' && (
        <CardItem>
          <Text>Tu viaje ya finalizó</Text>
        </CardItem>
      )}
      {asDriver && trip.trip_status === 'open' ? (
        <>
          {loadingButton || fetchingPassengers ? (
            <CardItem style={styles.spinner}>
              <Spinner style={{ flex: 1 }} color="blue" />
            </CardItem>
          ) : (
            <Button
              style={{ alignSelf: 'center', backgroundColor: '#0000FF' }}
              onPress={() => {
                onPressStartTrip()
              }}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
                Ir
              </Text>
            </Button>
          )}
        </>
      ) : trip.trip_status === 'in_progress' ? (
        <>
        {loadingButton ? (
          <CardItem style={styles.spinner}>
            <Spinner style={{ flex: 1 }} color="blue" />
          </CardItem>
        ) : (
          <Button
            style={{ alignSelf: 'center', backgroundColor: '#0000FF' }}
            onPress={async () => {
              setLoadingButton(true)
              await toCurrentTrip()
              setLoadingButton(false)
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
              Ver
            </Text>
          </Button>
        )}
        </>
      ) : null}
    </Card>
  ) : null
}

DetailedTrip.propTypes = {
  trip: PropTypes.object.isRequired,
  asDriver: PropTypes.bool.isRequired,
  driver: PropTypes.object.isRequired,
  onPressStartTrip: PropTypes.func.isRequired,
  toCurrentTrip: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 25,
    paddingVertical: 15,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  mapView: {
    height: 200,
    width: '100%',
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
  spinner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
