import React from 'react'
import { ScrollView } from 'react-native'
import { Text } from 'native-base'
import PropTypes from 'prop-types'

const StopsList = ({ stops = [] }) => {
  return (
    <ScrollView>
      {stops.stops.map(stop => (
        <Text key={`stop-${stop}`}>{stop}</Text>
      ))}
    </ScrollView>
  )
}

StopsList.propTypes = {
  stops: PropTypes.object,
}

export default StopsList
