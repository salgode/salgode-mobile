import React from 'react'
import * as Permissions from 'expo-permissions'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import mapStyle from '../config/google/mapStyle'

const Map = ({ showLocation, initialRegion }) => {
  const [region, setRegion] = React.useState(initialRegion)
  const [allowFindOnce, setAllowFindOnce] = React.useState(true)
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      showsUserLocation={showLocation}
      customMapStyle={mapStyle}
      onMapReady={() => {
        Permissions.askAsync(Permissions.LOCATION)
      }}
      onUserLocationChange={({ nativeEvent }) => {
        const { coordinate } = nativeEvent
        if (coordinate && allowFindOnce) {
          setAllowFindOnce(false)
          setRegion({
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          })
        }
      }}
      region={region}
      userLocationAnnotationTitle="Mi ubicación"
      loadingEnabled={true}
    />
  )
}

Map.propTypes = {
  showLocation: PropTypes.bool,
  initialRegion: PropTypes.object
}

Map.defaultProps = {
  showLocation: false,
  initialRegion: {
    latitude: -33.437183,
    longitude: -70.633395,
    latitudeDelta: 20,
    longitudeDelta: 20,
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    height: '100%',
    width: '100%',
  }
})

export default Map
