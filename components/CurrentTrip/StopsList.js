import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import StopIcon, { STOP_ICON_TYPES } from './StopIcon'
import PropTypes from 'prop-types'

const stopIndexToStopType = (i, length) => {
  let type
  if (i === 0) {
    type = STOP_ICON_TYPES.start
  } else if (i === length - 1) {
    type = STOP_ICON_TYPES.end
  } else {
    type = STOP_ICON_TYPES.middle
  }

  return type
}

const StopsList = ({ stops = [] }) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {stops.map((stop, i) => (
          <View key={`stop-${stop}-${i}`} style={styles.stopContainer}>
            <View style={styles.iconView}>
              <StopIcon type={stopIndexToStopType(i, stops.length)} size={25} />
            </View>
            <Text styles={styles.stopText}>{stop}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

StopsList.propTypes = {
  stops: PropTypes.array,
}

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  iconView: {
    marginRight: 15,
  },
  stopContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  stopText: {
    fontSize: 20,
  },
})

export default StopsList
