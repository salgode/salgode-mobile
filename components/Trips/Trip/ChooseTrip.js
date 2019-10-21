import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Card, View, Text, CardItem } from 'native-base'
import Location from './Location'
import Colors from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/AntDesign';
import TimeInfo from './TimeInfo'
import PedirBoton from './PedirBoton'
import PropTypes from 'prop-types'

const ChooseTrip = ({ timestamp, spacesUsed, user, startPoint, endPoint, onSend}) => {
  return (
    <Card style={styles.containerRequested}>
      <CardItem style={styles.dataContainer}>
        <View style={styles.user}>
          <View style={styles.userData}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
              size={80}
            />
            <Text style={styles.userText}>{user.name}</Text>
          </View>
          <View style={styles.iconInfoGroup}>
            <View style={styles.iconContainer}>
              <Icon name="like1" style={styles.infoIcon} />
              <Text style={styles.iconText}>{user.reputation}</Text>
            </View>
            <View style={styles.iconContainer}>
              <Icon name="addusergroup" style={styles.infoIcon} />
              <Text style={styles.iconText}>{spacesUsed}</Text>
            </View>
          </View>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        <Location color={'#fd5844'} location={startPoint} />
        <Location color={'#886afe'} location={endPoint} />
      </CardItem>
      <CardItem style={styles.bottomSection}>
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
    backgroundColor: '#fff',
    borderColor: '#ffffff',
    borderWidth: 0,
    alignItems: 'flex-start',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  dataContainer: {
    alignSelf: 'stretch'
  },
  iconInfoGroup: {
    position: 'absolute',
    right: 5
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconText: {
    color: 'grey',
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
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
  bottomSection: {
    alignSelf: 'stretch'
  },
  infoIcon: {
    color: 'grey',
    fontSize: 30,
  },
})

export default ChooseTrip
