import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem } from 'native-base'
import Location from './Location'
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/AntDesign'
import TimeInfo from './TimeInfo'
import PedirBoton from './PedirBoton'
import PropTypes from 'prop-types'
import { getUserInfo } from '../../../utils/getTripInfo'

const ChooseTrip = ({
  timestamp,
  // spacesUsed,
  // user,
  stops,
  onSend,
  token,
  tripId,
  userId,
}) => {
  const [loading, setLoading] = React.useState(true)
  // const [_stops, _setStops] = React.useState(['', ''])
  // const [stops, setStops] = React.useState(['', ''])
  const [user, setUser] = React.useState({ name: '' })

  const parseStops = async () => {
    // const stps = await getTripInfo(tripId, token)
    // _setStops(stps.trip_route_points)
    // setStops(stps.trip_route_points.map(s => (s || { address: '' }).address))
  }

  const loadUserInfo = async () => {
    const userInfo = await getUserInfo(userId, token)
    setUser(userInfo)
  }

  React.useEffect(() => {
    const stopsPromise = parseStops()
    const userPromise = loadUserInfo()
    Promise.all([stopsPromise, userPromise]).then(() => setLoading(false))
  }, [])

  return loading ? (
    <View></View>
  ) : (
    <Card style={styles.containerRequested}>
      <CardItem style={styles.dataContainer}>
        <View style={styles.user}>
          <View style={styles.userData}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
              size={80}
            />
            <Text style={styles.userText}>
              {`${user.first_name} ${user.last_name}`}
            </Text>
          </View>
          <View style={styles.iconInfoGroup}>
            <View style={styles.iconContainer}>
              <Icon name="like1" style={styles.infoIcon} />
              <Text style={styles.iconText}>{user.reputation}</Text>
            </View>
          </View>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        <Location color={'#0000FF'} location={stops[0].name} />
        <Location color={'#33C534'} location={stops[stops.length - 1].name} />
      </CardItem>
      <CardItem style={styles.bottomSection}>
        <TimeInfo timestamp={timestamp} />
        <PedirBoton onSend={() => onSend(stops, tripId)} disabled={loading} />
      </CardItem>
    </Card>
  )
}

ChooseTrip.propTypes = {
  timestamp: PropTypes.number.isRequired,
  // user: PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   reputation: PropTypes.number.isRequired,
  // }),
  token: PropTypes.string.isRequired,
  tripId: PropTypes.string.isRequired,
  onSend: PropTypes.func,
  userId: PropTypes.string.isRequired,
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
