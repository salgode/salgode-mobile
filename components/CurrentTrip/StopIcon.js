import React from 'react'
import { View } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'

export const STOP_ICON_TYPES = {
  start: 0,
  middle: 1,
  end: 2,
}

const StopIcon = ({ type, size = 50 }) => {
  const styles = getStyles(size)
  switch (type) {
    case STOP_ICON_TYPES.start:
      return <View style={[styles.icon, styles.start]} />
    case STOP_ICON_TYPES.middle:
      return (
        <MaterialIcons
          name="location-searching"
          size={size}
          color={Colors.textGray}
        />
      )
    case STOP_ICON_TYPES.end:
      return <View style={[styles.icon, styles.end]}></View>
  }
}

StopIcon.propTypes = {
  type: PropTypes.oneOf(Object.values(STOP_ICON_TYPES)).isRequired,
  size: PropTypes.number,
}

const getStyles = size => {
  const circleDiameter = size
  return {
    end: {
      backgroundColor: '#33C534',
    },
    icon: {
      borderRadius: circleDiameter / 2,
      elevation: 5,
      height: circleDiameter,
      width: circleDiameter,
    },
    start: {
      backgroundColor: '#FF5242',
    },
  }
}

export default StopIcon
