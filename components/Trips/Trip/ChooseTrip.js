import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem } from 'native-base'
import Location from './Location'
import Colors from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TimeInfo from './TimeInfo'
import PedirBoton from './PedirBoton'
import PropTypes from 'prop-types'

const ChooseTrip = ({ timestamp, spacesUsed, user, onSend}) => {
  let statusColor
  let statusText

  return (
    <Card style={styles.containerRequested}>
      <View style={{ backgroundColor: statusColor }}>
        <Text style={styles.statusText}>{statusText}</Text>
      </View>
      <CardItem>
        <View style={styles.user}>
          <View style={styles.userData}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
              size={80}
            />
            <Text style={styles.userText}>{user.name}</Text>
          </View>
          <View>
            <View style={styles.iconContainer}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-thumbs-up' : 'md-thumbs-up'}
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
        <TimeInfo timestamp={timestamp} />
        <PedirBoton onSend={onSend}/>
      </CardItem>
    </Card>
  )
}

ChooseTrip.propTypes = {
  timestamp: PropTypes.number.isRequired,
  spacesUsed: PropTypes.number.isRequired,
  onSend: PropTypes.func,
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

export default ChooseTrip
