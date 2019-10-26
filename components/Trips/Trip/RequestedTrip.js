import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import Location from './Location'
import Colors from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TimeInfo from './TimeInfo'
import { Card, View, Text, CardItem, Button, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'

const RequestedTrip = ({
  timestamp,
  user,
  status,
  startLocation,
  endLocation,
  onSend,
  onPressTrip,
  asDriver,
  trip,
}) => {
  let statusColor
  let statusText

  if (status === 'accepted' || status === 'completed') {
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
    <Card style={styles.containerRequested} borderWidth={5}>
      <View style={{ ...styles.status, backgroundColor: statusColor }}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <CardItem>
        <View style={styles.user}>
          <View style={styles.userData}>
            {user.driver_avatar ? (
              <Thumbnail source={{ uri: user.driver_avatar }} />
            ) : (
                <Ionicons
                  name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                  size={40}
                />
              )}
            <Text style={styles.userText}>{user.driver_name}</Text>
          </View>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        <Location color={'#0000FF'} location={startLocation} />
        <Location color={'#33C534'} location={endLocation} />
      </CardItem>
      <CardItem>
        <TimeInfo timestamp={timestamp} />
      </CardItem>
      <CardItem style={styles.containerBottom}>
        <Button
          borderRadius={10}
          style={styles.button}
          onPress={() => onPressTrip(asDriver, trip)}
        >
          <Text style={styles.blueText}>Ver Viaje</Text>
        </Button>
        <Button borderRadius={10} style={styles.cancelButton} onPress={onSend}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </Button>
      </CardItem>
    </Card>
  )
}

RequestedTrip.propTypes = {
  timestamp: PropTypes.string.isRequired,
  user: PropTypes.shape({
    driver_name: PropTypes.string.isRequired,
    driver_avatar: PropTypes.string,
  }).isRequired,
  status: PropTypes.oneOf([
    'accepted',
    'pending',
    'rejected',
    'completed',
    'open',
    'in_progress',
  ]),
  startLocation: PropTypes.object.isRequired,
  endLocation: PropTypes.object.isRequired,
  onSend: PropTypes.func,
  trip: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  blueText: {
    color: '#0000FF',
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#0000FF',
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: '#FF5242',
    borderWidth: 1,
  },
  cancelText: {
    color: '#FF5242',
  },
  containerBottom: {
    justifyContent: 'space-evenly',
    width: '100%',
  },
  containerRequested: {
    alignItems: 'flex-start',
    // borderColor: Colors.lightBackground,
    borderRadius: 20,
    // borderWidth: 10,
    padding: 15,
    shadowColor: '#b3b3b3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  status: { borderRadius: 15, paddingHorizontal: 10, paddingVertical: 2 },
  statusText: { color: 'white', fontSize: 12, fontWeight: '700' },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  userData: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userText: {
    color: Colors.textGray,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 15,
  },
})

export default RequestedTrip
