import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem } from 'native-base'
import Location from './Location'
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/AntDesign'
import TimeInfo from './TimeInfo'
import PedirBoton from './PedirBoton'
import PropTypes from 'prop-types'

const ChooseTrip = ({
  // The timestamp that indicates the start of the trip. Required.
  timestamp,
  // The driver information, including its name, reputation and id. Required.
  driver,
  // The stops of the trip, including their name and id. Required.
  stops,
  // Function called when "Solicitar Viaje" is pressed. Required.
  onSend,
  // The trip id. Required.
  tripId,
}) => {
  // const [loading, setLoading] = React.useState(true)
  return (
    <Card style={styles.containerRequested}>
      <CardItem style={styles.dataContainer}>
        <View style={styles.user}>
          <View style={styles.userData}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
              size={80}
            />
            <Text style={styles.userText}>{`${driver.name}`}</Text>
          </View>
          <View style={styles.iconInfoGroup}>
            <View style={styles.iconContainer}>
              <Icon name="like1" style={styles.infoIcon} />
              <Text style={styles.iconText}>{driver.reputation}</Text>
            </View>
          </View>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        <Location color={'#0000FF'} location={stops[0]} />
        <Location color={'#33C534'} location={stops[stops.length - 1]} />
      </CardItem>
      <CardItem style={styles.bottomSection}>
        <TimeInfo timestamp={timestamp} />
        <PedirBoton onSend={() => onSend(stops, tripId)} />
      </CardItem>
    </Card>
  )
}

ChooseTrip.propTypes = {
  timestamp: PropTypes.number.isRequired,
  driver: PropTypes.shape({
    name: PropTypes.string.isRequired,
    reputation: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }),
  tripId: PropTypes.string.isRequired,
  onSend: PropTypes.func,
  stops: PropTypes.array,
}

const styles = StyleSheet.create({
  bottomSection: {
    alignSelf: 'stretch',
  },
  containerRequested: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 0,
    elevation: 1,
    paddingBottom: 15,
    paddingRight: 15,
    paddingTop: 15,
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  dataContainer: {
    alignSelf: 'stretch',
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconInfoGroup: {
    position: 'absolute',
    right: 5,
  },
  iconText: {
    color: 'grey',
  },
  infoIcon: {
    color: 'grey',
    fontSize: 30,
    paddingRight: 5,
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
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

export default ChooseTrip
