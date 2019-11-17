import React from 'react'
import * as Permissions from 'expo-permissions'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import { StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import mapStyle from '../config/google/mapStyle'

const SalgoDeMap = ({
  showLocation,
  initialRegion,
  markers,
  showPath,
  path,
  multiPaths,
  pressMarker,
  showDescription,
  start,
  end,
  allowInteraction = true,
  goToMarkers = false,
  markersToFit = [],
}) => {
  const [region, setRegion] = React.useState(initialRegion)
  const [allowFindOnce, setAllowFindOnce] = React.useState(true)
  const [fitOnce, setFitOnce] = React.useState(true)
  const mapRef = React.useRef()
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      showsUserLocation={showLocation}
      customMapStyle={mapStyle}
      onMapReady={() => {
        Permissions.askAsync(Permissions.LOCATION)
      }}
      onLayout={() => {
        if (goToMarkers && fitOnce) {
          try {
            const showMarkers = markersToFit.map(m => ({
              latitude: parseFloat(m.lat),
              longitude: parseFloat(m.lon),
            }))
            setTimeout(() => {
              setFitOnce(false)
              mapRef.current.fitToCoordinates(showMarkers, {
                edgePadding: {
                  top: 40,
                  bottom: 30,
                  right: 10,
                  left: 10,
                },
              })
            }, 1000)
          } catch (e) {
            Alert.alert(
              'Problema cargando el mapa',
              'Hubo un problema visualizando el recorrido en el mapa'
            )
          }
        }
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
      showsCompass={false}
      showsMyLocationButton={false}
      region={region}
      userLocationAnnotationTitle="Mi ubicación"
      zoomEnabled={allowInteraction}
      zoomControlEnabled={false}
      rotateEnabled={allowInteraction}
      scrollEnabled={allowInteraction}
      pitchEnabled={false}
      toolbarEnabled={false}
      onMarkerPress={({ nativeEvent }) => {
        const mkr = JSON.parse(nativeEvent.id)
        if (mkr) {
          const { coordinate } = nativeEvent
          if (pressMarker) {
            pressMarker(mkr)
          }
          setRegion({
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          })
        }
      }}
    >
      {markers.length !== 0 && markers.map(m => {
        let color = 'red'
        if (start && m.place_id === start.place_id) {
          color = 'blue'
        }
        if (end && m.place_id === end.place_id) {
          color = 'green'
        }
        return (
          <Marker
            key={`${m.place_id}-${color}`}
            identifier={JSON.stringify(m)}
            coordinate={{
              latitude: parseFloat(m.lat),
              longitude: parseFloat(m.lon),
            }}
            title={showDescription ? m.place_name : undefined}
            description={showDescription ? m.address : undefined}
            pinColor={color}
          />
        )
      })}
      {showPath && (
        <>
          {path && path.length ? (
            <Polyline
              coordinates={path.map(p => ({
                latitude: parseFloat(p.lat),
                longitude: parseFloat(p.lon),
              }))}
              strokeColor={'red'}
              strokeWidth={5}
              lineDashPattern={[10, 20]}
            />
          ) : multiPaths && multiPaths.length ? (
            <>
              {multiPaths.map((singlePath, id) => (
                <Polyline
                  key={id}
                  coordinates={singlePath.map(p => ({
                    latitude: parseFloat(p.lat),
                    longitude: parseFloat(p.lon),
                  }))}
                  strokeColor={'red'}
                  strokeWidth={5}
                  lineDashPattern={[10, 20]}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </MapView>
  )
}

SalgoDeMap.propTypes = {
  showLocation: PropTypes.bool,
  initialRegion: PropTypes.object,
  markers: PropTypes.array,
  showPath: PropTypes.bool,
  path: PropTypes.array,
  pressMarker: PropTypes.func,
  showDescription: PropTypes.bool,
  start: PropTypes.object,
  end: PropTypes.object,
  allowInteraction: PropTypes.bool.isRequired,
  goToMarkers: PropTypes.bool.isRequired,
  multiPaths: PropTypes.array,
  markersToFit: PropTypes.array.isRequired,
}

SalgoDeMap.defaultProps = {
  showLocation: false,
  initialRegion: {
    latitude: -33.437183,
    longitude: -70.633395,
    latitudeDelta: 20,
    longitudeDelta: 20,
  },
  markers: [],
  showPath: false,
  path: [],
  pressMarker: undefined,
  showDescription: false,
  start: undefined,
  end: undefined,
  multiPaths: [],
}

const styles = StyleSheet.create({
  mapStyle: {
    height: '100%',
    width: '100%',
  },
})

export default SalgoDeMap
