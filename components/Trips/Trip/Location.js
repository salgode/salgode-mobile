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
    height: circleDiameter,
    marginRight: 15,
    width: circleDiameter,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  location: {
    fontSize: 17,
  },
})

export default Location
