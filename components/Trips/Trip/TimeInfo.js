import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text } from 'native-base'
import Icon from 'react-native-vector-icons/AntDesign'
import PropTypes from 'prop-types'
import { showDate, showOnlyTime } from '../../../utils/time'

const TimeInfo = ({ timestamp, displayAsRow = false }) => {
  const contaierStyle = {
    ...styles.container,
    ...(displayAsRow
      ? {
          flexDirection: 'row',
          flexWrap: 'wrap',
        }
      : {}),
  }
  return (
    <View style={contaierStyle}>
      <View style={styles.rowElement}>
        <Icon name="calendar" style={styles.icon} />
        <Text style={styles.location}>{showDate(timestamp)}</Text>
      </View>
      <View style={styles.rowElement}>
        <Icon name="clockcircleo" style={styles.icon} />
        <Text style={styles.location}>{showOnlyTime(timestamp)}</Text>
      </View>
    </View>
  )
}

TimeInfo.propTypes = {
  timestamp: PropTypes.number.isRequired,
  displayAsRow: PropTypes.bool,
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginLeft: 5,
  },
  icon: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 15,
    paddingLeft: 5,
    paddingRight: 10,
    // Correct icons white space
    //top: 2,
  },
  location: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 13,
    fontWeight: '500',
    marginRight: 15,
  },
  rowElement: {
    alignContent: 'center',
    flexDirection: 'row',
  },
})

export default TimeInfo
