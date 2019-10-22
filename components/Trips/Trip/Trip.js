import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import CardIcon from './CardIcon'
import TimeInfo from './TimeInfo'

export const Trip = ({ timestamp, spacesUsed }) => {
  return (
    <Card style={[styles.container, styles.shadow]}>
      <View style={styles.locationContainer}>
        <Location color={'#0000FF'} location="Campus San Joaquin" />
        <Location color={'#33C534'} location="Campus San Joaquin" />
        <TimeInfo timestamp={timestamp} isDate />
        <TimeInfo timestamp={timestamp} />
      </View>
      <View style={styles.iconContainer}>
        {/* <CardIcon
          style={{ alignSelf: 'center' }}
          name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
          onPress={() => null}
        /> */}
        <View style={styles.spacesUsedContainer}>
          <Text style={styles.spacesUsed}>{spacesUsed}</Text>
          <CardIcon
            name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
            bottom
          />
        </View>
      </View>
    </Card>
  )
}

Trip.propTypes = {
  timestamp: PropTypes.number.isRequired,
  spacesUsed: PropTypes.number.isRequired,
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
  spacesUsed: {
    alignSelf: 'center',
    color: Colors.textGray,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 5,
  },
  spacesUsedContainer: { alignItems: 'center', flexDirection: 'row' },
})

export default Trip
