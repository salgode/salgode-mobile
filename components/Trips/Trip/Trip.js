import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, View, Text } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
// import Colors from '../../../constants/Colors'
// import CardIcon from './CardIcon'
import TimeInfo from './TimeInfo'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const Trip = ({
  timestamp,
  onPressTrip,
  asDriver = false,
  user,
  startLocation,
  endLocation,
  trip,
}) => {
  if (trip.trip_status === 'completed') {
    return null
  }
  const status = trip.trip_status
  let statusColor
  let statusText

  if (status === 'open') {
    statusColor = 'green'
    statusText = 'Por iniciar'
  } else if (status === 'in_progress') {
    statusColor = 'purple'
    statusText = 'En curso'
  } else {
    statusColor = 'blue'
    statusText = 'Completado'
  }
  return (
    <TouchableOpacity
      onPress={() => {
        onPressTrip(asDriver, trip)
      }}
    >
      <Card style={[styles.container, styles.shadow]}>
        <View style={styles.locationContainer}>
          <View style={{ ...styles.status, backgroundColor: statusColor }}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
          <Text>{user.driver_name}</Text>
          <Location color={'#0000FF'} location={startLocation.place_name} />
          <Location color={'#33C534'} location={endLocation.place_name} />
          <TimeInfo timestamp={timestamp} />
        </View>
        <View style={styles.iconContainer}>
          {/* <CardIcon
          style={{ alignSelf: 'center' }}
          name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
          onPress={() => null}
        /> */}
          {/* <View style={styles.spacesUsedContainer}>
            <Text style={styles.spacesUsed}>{spacesUsed}</Text>
            <CardIcon
              name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
              onPress={() => null}
            />
            <View style={styles.spacesUsedContainer}>
              <Text style={styles.spacesUsed}>{spacesUsed}</Text>
              <CardIcon
                name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
              />
            </View>
          </View> */}
        </View>
      </Card>
    </TouchableOpacity>
  )
}

Trip.propTypes = {
  timestamp: PropTypes.string.isRequired,
  onPressTrip: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  startLocation: PropTypes.object.isRequired,
  endLocation: PropTypes.object.isRequired,
  asDriver: PropTypes.bool.isRequired,
  trip: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  iconContainer: {
    alignItems: 'flex-end',
    height: 150,
    justifyContent: 'space-between',
  },
  locationContainer: {
    height: 150,
    justifyContent: 'space-evenly',
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
  status: { borderRadius: 15, paddingHorizontal: 10, paddingVertical: 2 },
  statusText: { color: 'white', fontSize: 12, fontWeight: '700' },
  // spacesUsed: {
  //   alignSelf: 'center',
  //   color: Colors.textGray,
  //   fontSize: 13,
  //   fontWeight: '700',
  //   marginRight: 5,
  // },
  // spacesUsedContainer: { alignItems: 'center', flexDirection: 'row' },
})

export default Trip
