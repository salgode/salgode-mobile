import React from 'react'
import * as Permissions from 'expo-permissions'
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps'
import { StyleSheet, Alert, View, Text } from 'react-native'
import PropTypes from 'prop-types'
import mapStyle from '../config/google/mapStyle'
import ClusteredMapView from 'react-native-maps-super-cluster'

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
  cluster = false,
  markersToFit = [],
}) => {
  const [region, setRegion] = React.useState(initialRegion)
  const [allowFindOnce, setAllowFindOnce] = React.useState(true)
  const [fitOnce, setFitOnce] = React.useState(true)
  const mapRef = React.useRef()

  if (markers.length) {
    for (let mk of markers) {
      if (start && mk.place_id === start.place_id) {
        mk.color = 'blue'
      } else if (end && mk.place_id === end.place_id) {
        mk.color = 'green'
      } else {
        mk.color = 'red'
      }
    }
  }

  const onMapReady = React.useCallback(() => {
    Permissions.askAsync(Permissions.LOCATION)
  }, [])

  const onLayout = React.useCallback(() => {
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
  }, [fitOnce])

  const onUserLocationChange = React.useCallback(({ nativeEvent }) => {
    const { coordinate } = nativeEvent
    if (coordinate && allowFindOnce && mapRef) {
      setAllowFindOnce(false)
      if (cluster) {
        mapRef.current.mapview.animateToRegion({
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }, 1500)
      } else {
        mapRef.current.animateToRegion({
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }, 1500)
      }
    }
  }, [mapRef, allowFindOnce])

  const renderMarker = React.useCallback((m) => {
    return (
      <Marker
        key={`${m.place_id}-${m.color}`}
        identifier={JSON.stringify(m)}
        coordinate={{
          latitude: parseFloat(m.lat),
          longitude: parseFloat(m.lon),
        }}
        title={showDescription ? m.place_name : undefined}
        description={showDescription ? m.address : undefined}
        pinColor={m.color}
      />
    )
  }, [])

  const renderCluster = React.useCallback((cluster, onPress) => {
    const { pointCount, coordinate, clusterId } = cluster

    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    const clusteringEngine = mapRef.current.getClusteringEngine()
    const clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

    return (
      <Marker coordinate={coordinate} onPress={onPress}>
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
        </View>
        {/*
            Eventually use <Callout /> to
            show clustered point thumbs, i.e.:
            <Callout>
              <ScrollView>
                {
                  clusteredPoints.map(p => (
                    <Image source={p.image}>
                  ))
                }
              </ScrollView>
            </Callout>

            IMPORTANT: be aware that Marker's onPress event isn't really consistent when using Callout.
           */}
      </Marker>
    )
  }, [mapRef])

  const onMarkerPress = React.useCallback(({ nativeEvent }) => {
    const mkr = JSON.parse(nativeEvent.id)
    if (mkr && mapRef) {
      const { coordinate } = nativeEvent
      if (pressMarker) {
        pressMarker(mkr)
      }
      if (cluster) {
        mapRef.current.mapview.animateToRegion({
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }, 1000)
      } else {
        mapRef.current.animateToRegion({
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
        }, 1000)
      }
    }
  }, [mapRef])

  if (cluster === true) {
    return (
      <ClusteredMapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        showsUserLocation={showLocation}
        data={markers.map(m => ({
          location: {
            latitude: parseFloat(m.lat),
            longitude: parseFloat(m.lon),
          },
          marker: m
        }))}
        customMapStyle={mapStyle}
        onMapReady={onMapReady}
        onLayout={onLayout}
        onUserLocationChange={onUserLocationChange}
        renderMarker={(data) => renderMarker(data.marker)}
        renderCluster={renderCluster}
        showsCompass={false}
        showsMyLocationButton={false}
        initialRegion={region}
        userLocationAnnotationTitle="Mi ubicación"
        zoomEnabled={allowInteraction}
        zoomControlEnabled={false}
        rotateEnabled={allowInteraction}
        scrollEnabled={allowInteraction}
        pitchEnabled={false}
        toolbarEnabled={false}
        onMarkerPress={onMarkerPress}
      >
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
      </ClusteredMapView>
    )
  }
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={styles.mapStyle}
      showsUserLocation={showLocation}
      customMapStyle={mapStyle}
      onMapReady={onMapReady}
      onLayout={onLayout}
      onUserLocationChange={onUserLocationChange}
      showsCompass={false}
      showsMyLocationButton={false}
      initialRegion={region}
      userLocationAnnotationTitle="Mi ubicación"
      zoomEnabled={allowInteraction}
      zoomControlEnabled={false}
      rotateEnabled={allowInteraction}
      scrollEnabled={allowInteraction}
      pitchEnabled={false}
      toolbarEnabled={false}
      onMarkerPress={onMarkerPress}
    >
      {markers.length !== 0 && markers.map(renderMarker)}
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
    flex: 1,
    height: '100%',
    width: '100%',
  },
  myClusterStyle: {
    backgroundColor: 'white',
    borderColor: 'green',
    borderRadius: 100,
    borderWidth: 1,
    padding: 5,
  },
})

export default SalgoDeMap
