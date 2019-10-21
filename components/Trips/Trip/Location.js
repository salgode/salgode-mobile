import React from 'react'
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const Location = ({ color, location }) => {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.circle, backgroundColor: color }} />
      <Text style={styles.location}>{location}</Text>
    </View>
  )
}

Location.propTypes = {
  color: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
}

const circleDiameter = 17
const styles = StyleSheet.create({
  circle: {
    borderRadius: circleDiameter / 2,
    elevation: 1,
    height: circleDiameter,
    marginRight: 15,
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: circleDiameter,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  location: {
    color: 'grey',
    fontSize: 17,
  },
})

export default Location
