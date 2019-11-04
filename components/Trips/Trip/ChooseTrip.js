import React from 'react'
import { StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native'
import { Card, View, Text, CardItem, Thumbnail } from 'native-base'
import Location from './Location'
import { Ionicons } from '@expo/vector-icons'
// import Icon from 'react-native-vector-icons/AntDesign'
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
  // Function called when the user tap on the whole card.
  onPress,
}) => {
  // const [loading, setLoading] = React.useState(true)
  let Avatar
  if (driver.driver_avatar) {
    Avatar = <Thumbnail source={{ uri: driver.driver_avatar }} />
  } else {
    Avatar = (
      <Ionicons
        color={'grey'}
        name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-contact`}
        size={80}
        style={styles.icon}
      />
    )
  }
  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
      <Card style={styles.containerRequested}>
        <CardItem style={styles.dataContainer}>
          <View style={styles.user}>
            <View style={styles.userData}>
              {Avatar}
              <Text style={styles.userText}>{`${driver.driver_name}`}</Text>
            </View>
            {/* <View style={styles.iconInfoGroup}>
              <View style={styles.iconContainer}>
                <Icon name="like1" style={styles.infoIcon} />
                <Text style={styles.iconText}>{driver.reputation}</Text>
              </View>
            </View> */}
          </View>
        </CardItem>
        <CardItem style={styles.locationContainer}>
          <Location color={'#0000FF'} location={stops[0].place_name} />
          <Location color={'#33C534'} location={stops[stops.length - 1].place_name} />
        </CardItem>
        <CardItem style={styles.bottomSection}>
          <TimeInfo timestamp={timestamp} isDate />
          <PedirBoton onSend={() => onSend(stops, tripId)} />
        </CardItem>
      </Card>
    </TouchableWithoutFeedback>
  )
}

ChooseTrip.propTypes = {
  timestamp: PropTypes.instanceOf(Date).isRequired,
  driver: PropTypes.shape({
    driver_name: PropTypes.string.isRequired,
    // reputation: PropTypes.number.isRequired,
    driver_id: PropTypes.string.isRequired,
    driver_avatar: PropTypes.string.isRequired,
  }),
  tripId: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  onSend: PropTypes.func,
  stops: PropTypes.array,
}

const styles = StyleSheet.create({
  avatar: {
    height: 80,
    width: 80,
  },
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
  // iconContainer: {
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // iconInfoGroup: {
  //   position: 'absolute',
  //   right: 5,
  // },
  // iconText: {
  //   color: 'grey',
  // },
  // infoIcon: {
  //   color: 'grey',
  //   fontSize: 30,
  //   paddingRight: 5,
  // },
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
