import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem, Button } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import TimeInfo from './TimeInfo'
import { Ionicons } from '@expo/vector-icons'

export const DetailedTrip = ({ trip, asDriver }) => {
  const driver = trip ? trip.driver : null

  function renderLocation(locations) {
    return locations.map((location, index) => (
      <Location
        key={`location-${index}`}
        color={
          index === 0
            ? 'red'
            : index === locations.length - 1
            ? Colors.tintColor
            : Colors.textGray
        }
        location={location.name}
      />
    ))
  }

  function startTrip() {
    // TODO: connect to server
    // TODO: navigate to current trip screen
    console.log('trip!')
  }

  return trip != null ? (
    <Card
      style={{
        ...styles.container,
        ...styles.shadow,
      }}
    >
      <CardItem>
        <View style={styles.user}>
          <View style={styles.userData}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
              size={40}
            />
            <Text style={styles.userText}>
              {driver.name} {driver.lastName}
            </Text>
          </View>
          <View>
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
          </View>
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
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: 15,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    // height: 150,
    // justifyContent: 'space-evenly',
  },
  shadow: {
    shadowColor: '#b3b3b3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
  },
  userData: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userText: {
    fontSize: 17,
    marginLeft: 15,
  },
})

export default DetailedTrip
