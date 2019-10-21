import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import StopIcon, { STOP_ICON_TYPES } from './StopIcon'
import Colors from '../../constants/Colors'
import UserToPickUp from './UserToPickUp'

const CurrentStop = ({ before, after, location, usersToPickUp = [] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>#Llego en 5</Text>
      <View style={styles.roadContainer}>
        <StopIcon type={before} />
        <View style={styles.bar} />
        <StopIcon type={after} />
      </View>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.pickup}>Recoge a:</Text>
      <ScrollView style={styles.userContainer}>
        {usersToPickUp.map((user, i) => (
          <UserToPickUp name={user.name} location={user.location} key={i} />
        ))}
      </ScrollView>
      <Button style={styles.button}>
        <Text>Siguiente Parada</Text>
      </Button>
    </View>
  )
}

CurrentStop.propTypes = {
  before: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
  after: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
  location: PropTypes.string.isRequired,
  usersToPickUp: PropTypes.array,
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.textGray,
    height: 5,
    marginRight: '8%',
    width: '80%',
  },
  button: {
    alignSelf: 'center',
    borderRadius: 10,
    height: '10%',
    justifyContent: 'center',
    width: '70%',
  },
  container: {
    padding: '10%',
    ...StyleSheet.absoluteFillObject,
  },
  location: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: '10%',
  },
  pickup: {
    color: Colors.textGray,
    fontSize: 20,
  },
  roadContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: '2%',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: '10%',
  },
  userContainer: {
    height: '40%',
    margin: '10%',
  },
})

export default CurrentStop
