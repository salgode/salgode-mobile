import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'

export const STOP_ICON_TYPES = {
  start: 0,
  middle: 1,
  end: 2,
}

const StopIcon = ({ type }) => {
  switch (type) {
    case STOP_ICON_TYPES.start:
      return <View style={[styles.icon, styles.start]} />
    case STOP_ICON_TYPES.middle:
      return (
        <MaterialIcons
          name="location-searching"
          size={50}
          color={Colors.textGray}
        />
      )
    case STOP_ICON_TYPES.end:
      return <View style={[styles.icon, styles.end]}></View>
  }
}

StopIcon.propTypes = {
  type: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
}

const circleDiameter = 50
const styles = StyleSheet.create({
  end: {
    backgroundColor: 'green',
  },
  icon: {
    borderRadius: circleDiameter / 2,
    elevation: 5,
    height: circleDiameter,
    width: circleDiameter,
  },
  start: {
    backgroundColor: 'red',
  },
})

export default StopIcon
