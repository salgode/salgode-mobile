import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import Location from './Location'
import Colors from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TimeInfo from './TimeInfo'
import { Card, View, Text, CardItem, Thumbnail, Button } from 'native-base'
import PropTypes from 'prop-types'

const RequestedTrip = ({
  timestamp,
  user,
  status = 'pending',
  startLocation = 'Desde',
  endLocation = 'Hasta',
  onSend,
  tripId,
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
    <Card style={[styles.containerRequested, styles.shadow]}>
      <View style={{ ...styles.status, backgroundColor: statusColor }}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <CardItem>
        <View style={styles.user}>
          <View style={styles.userData}>
            {user.selfieLink ? (
              <Thumbnail source={{ uri: user.selfieLink }} />
            ) : (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                size={40}
              />
            )}
            <Text style={styles.userText}>{user.name}</Text>
          </View>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        <Location color={'red'} location={startLocation} />
        <Location color={Colors.tintColor} location={endLocation} />
      </CardItem>
      <CardItem>
        <TimeInfo timestamp={timestamp} />
      </CardItem>
      <CardItem style={styles.containerBottom}>
        <Button borderRadius={10} style={styles.button} onPress={onSend}>
          <Text>Ver Viaje</Text>
        </Button>
        <Button borderRadius={10} style={styles.button} onPress={onSend}>
          <Text>Cancelar</Text>
        </Button>
      </CardItem>
    </Card>
  )
}

RequestedTrip.propTypes = {
  timestamp: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    selfieLink: PropTypes.string,
  }).isRequired,
  status: PropTypes.oneOf(['accepted', 'pending', 'rejected']),
  startLocation: PropTypes.string.isRequired,
  endLocation: PropTypes.string.isRequired,
  onSend: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  containerBottom: {
    justifyContent: 'space-evenly',
    width: '100%',
  },
  containerRequested: {
    alignItems: 'flex-start',
    borderColor: 'white',
    borderRadius: 20,
    padding: 15,
  },

  locationContainer: { flexDirection: 'column' },
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
