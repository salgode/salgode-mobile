import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, View, Text, CardItem, Button } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import TimeInfo from './TimeInfo'

export const DetailedTrip = ({ trip, asDriver }) => {
  // const driver = trip ? trip.driver : null

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

  function startTrip() {
    // TODO: connect to server
    // TODO: navigate to current trip screen
    // console.log('trip!')
  }

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
        <View style={styles.user}>
          {/* <View> */}
          {/* TODO: thumbs <View style={styles.iconContainer}>
                <Ionicons
                name={Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'}
                size={30}
                color={Colors.textGray}
                />
                <Text style={styles.iconText}>{driver.reputation}</Text>
            </View>*/}
          {/* <View style={styles.iconContainer}>
                <Ionicons
                name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
                size={30}
                color={Colors.textGray}
                /> */}
          {/* TODO: spacesUsed */}
          {/* <Text style={styles.iconText}>{spacesUsed}</Text> */}
          {/* </View> */}
          {/* </View> */}
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        {renderLocation(trip.route_points)}
      </CardItem>
      <CardItem>
        <TimeInfo timestamp={trip.etd} isDate />
      </CardItem>
      {asDriver ? (
        <Button
          style={{ alignSelf: 'center', backgroundColor: '#0000FF' }}
          onPress={() => startTrip()}
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
    width: '80%',
  },
  userData: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default DetailedTrip
