import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View } from 'native-base'
import Location from './Location'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import CardIcon from './CardIcon'
import TimeInfo from './TimeInfo'

const Trip = ({ timestamp }) => {
  return (
    <Card style={styles.container}>
      <View style={styles.locationContainer}>
        <Location color={'red'} location="Campus San Joaquin" />
        <Location color={Colors.tintColor} location="Campus San Joaquin" />
        <TimeInfo timestamp={timestamp} isDate />
        <TimeInfo timestamp={timestamp} />
      </View>
      <View style={styles.iconContainer}>
        <CardIcon
          name={Platform.OS === 'ios' ? 'ios-person-add' : 'md-person-add'}
        />
        <CardIcon
          name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
          bottom
        />
      </View>
    </Card>
  )
}

Trip.propTypes = {
  timestamp: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderRadius: 20,
    flexDirection: 'row',
    height: 180,
    justifyContent: 'space-between',
    padding: 15,
  },
  iconContainer: { height: 150, justifyContent: 'space-between' },
  locationContainer: {
    height: 150,
    justifyContent: 'space-evenly',
  },
})

export default Trip
