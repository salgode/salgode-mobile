import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { View, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import Colors from '../../../constants/Colors'
import timestampToDate, { timestampToTime } from '../../../utils/time'

const TimeInfo = ({ timestamp, isDate = false }) => {
  const iconName = isDate
    ? Platform.OS === 'ios'
      ? 'ios-calendar'
      : 'md-calendar'
    : 'md-time'
  const timestampText = isDate
    ? timestampToDate(timestamp)
    : timestampToTime(timestamp)
  return (
    <View style={styles.container}>
      <Ionicons
        name={iconName}
        color={Colors.textGray}
        size={25}
        style={styles.icon}
      />
      <Text style={styles.location}>{timestampText}</Text>
    </View>
  )
}

TimeInfo.propTypes = {
  timestamp: PropTypes.number.isRequired,
  isDate: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 15,
  },
  location: {
    fontSize: 17,
    marginRight: 15,
  },
})

export default TimeInfo
