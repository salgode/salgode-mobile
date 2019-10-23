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
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPressTrip(asDriver)
      }}
    >
      <Card style={[styles.container, styles.shadow]}>
        <View style={styles.locationContainer}>
          <Text>{user.driver_name}</Text>
          <Location color={'#0000FF'} location={startLocation.name} />
          <Location color={'#33C534'} location={endLocation.name} />
          <TimeInfo timestamp={timestamp.start} />
          <TimeInfo timestamp={timestamp.end} />
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
  timestamp: PropTypes.object.isRequired,
  onPressTrip: PropTypes.func.isRequired,
  asDriver: PropTypes.bool,
  user: PropTypes.object.isRequired,
  startLocation: PropTypes.object.isRequired,
  endLocation: PropTypes.object.isRequired,
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
