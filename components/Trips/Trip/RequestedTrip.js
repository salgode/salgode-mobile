import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem, Button, Icon } from 'native-base'
import Location from './Location'
import Colors from '../../../constants/Colors'
import TimeInfo from './TimeInfo'
import PropTypes from 'prop-types'
import IconWithText from './IconWithText'

const RequestedTrip = ({ timestamp, spacesUsed, user, status }) => {
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
    <Card style={styles.containerRequested}>
      <View style={{ ...styles.status, backgroundColor: statusColor }}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <CardItem>
        <View style={styles.user}>
          <IconWithText
            iconName={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
            iconSize={40}
            text={user.name}
          />
          <View>
            <IconWithText
              iconName={
                Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'
              }
              text={user.reputation}
            />
            <IconWithText
              iconName={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}
              text={spacesUsed}
            />
          </View>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        <Location color={'red'} location="Campus San Joaquin" />
        <Location color={Colors.tintColor} location="Campus San Joaquin" />
      </CardItem>
      <CardItem>
        <View style={styles.user}>
          <View>
            <TimeInfo timestamp={timestamp} isDate />
            <TimeInfo timestamp={timestamp} />
          </View>
          <Button transparent rounded bordered>
            <Icon name="phone" type="MaterialCommunityIcons" />
          </Button>
        </View>
      </CardItem>
    </Card>
  )
}

RequestedTrip.propTypes = {
  timestamp: PropTypes.number.isRequired,
  spacesUsed: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    reputation: PropTypes.number.isRequired,
  }).isRequired,
}

const styles = StyleSheet.create({
  containerRequested: {
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 15,
  },
  locationContainer: { flexDirection: 'column' },
  status: { borderRadius: 15, paddingHorizontal: 10, paddingVertical: 2 },
  statusText: { color: 'white' },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default RequestedTrip
