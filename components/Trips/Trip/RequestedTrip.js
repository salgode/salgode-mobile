import React from 'react'
import { StyleSheet, Platform, TouchableOpacity } from 'react-native'
import Location from './Location'
import Colors from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TimeInfo from './TimeInfo'
import PropTypes from 'prop-types'
import { Card, View, Text, CardItem } from 'native-base'

const RequestedTrip = ({
  timestamp,
  spacesUsed,
  user,
  status,
  onPressTrip,
  asDriver,
}) => {
  let statusColor
  let statusText

  if (status === 'accepted') {
    statusColor = 'green'
    statusText = 'Aceptado'
  } else if (status === 'pending') {
    statusColor = 'purple'
    statusText = 'Pendiente'
  } else {
    statusColor = 'red'
    statusText = 'Rechazado'
  }

  return (
    <TouchableOpacity
      onPress={() => {
        onPressTrip(asDriver)
      }}
    >
      <Card style={styles.containerRequested}>
        <View style={{ ...styles.status, backgroundColor: statusColor }}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
        <CardItem>
          <View style={styles.user}>
            <View style={styles.userData}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                size={40}
              />
              <Text style={styles.userText}>{user.name}</Text>
            </View>
            <View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={
                    Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'
                  }
                  size={30}
                  color={Colors.textGray}
                />
                <Text style={styles.iconText}>{user.reputation}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
                  size={30}
                  color={Colors.textGray}
                />
                <Text style={styles.iconText}>{spacesUsed}</Text>
              </View>
            </View>
          </View>
        </CardItem>
        <CardItem style={styles.locationContainer}>
          <Location color={'red'} location="Campus San Joaquin" />
          <Location color={Colors.tintColor} location="Campus San Joaquin" />
        </CardItem>
        <CardItem>
          <TimeInfo timestamp={timestamp} isDate />
          <TimeInfo timestamp={timestamp} />
        </CardItem>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  containerRequested: {
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 15,
  },
  iconContainer: { alignItems: 'center', flexDirection: 'row' },
  iconText: { marginLeft: 10 },
  locationContainer: { flexDirection: 'column' },
  status: { borderRadius: 15, paddingHorizontal: 10, paddingVertical: 2 },
  statusText: { color: 'white' },
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

export default RequestedTrip

RequestedTrip.propTypes = {
  timestamp: PropTypes.number.isRequired,
  spacesUsed: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  onPressTrip: PropTypes.func.isRequired,
  asDriver: PropTypes.bool.isRequired,
}
