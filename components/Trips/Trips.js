import React, { Component } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native'
import PropTypes from 'prop-types'
import MyTrip from './Trip/Trip'
import RequestedTrip from './Trip/RequestedTrip'
import { View, Text } from 'native-base'
import EmptyState from '../EmptyState/EmptyState'
import noTrips from '../../assets/images/notrips.png'

class MyTrips extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      isRequestedTrips,
      trips,
      driverTrips,
      onPressTrip,
      removeFromList,
      onRefresh,
      refreshing,
      token,
    } = this.props
    const Trip = isRequestedTrips ? RequestedTrip : MyTrip
    const tripsData = isRequestedTrips ? trips : driverTrips
    let filteredData
    if (isRequestedTrips) {
      filteredData = tripsData
        ? tripsData.filter(
            t =>
              t.etd_info &&
              t.etd_info.etd &&
              ['accepted', 'pending', 'declined'].includes(t.reservation_status)
          )
        : tripsData
    } else {
      filteredData = tripsData
    }
    const asDriver = !isRequestedTrips
    if (filteredData && filteredData.length) {
      return (
        <SafeAreaView>
          <FlatList
            style={{ minHeight: 300 }}
            data={filteredData}
            onRefresh={onRefresh}
            refreshing={refreshing}
            renderItem={({ item }) => {
              return (
                <Trip
                  timestamp={item.etd_info.etd}
                  spacesUsed={item.spacesUsed}
                  user={item.driver}
                  reservationStatus={item.reservation_status}
                  asDriver={asDriver}
                  onPressTrip={onPressTrip}
                  trip={item}
                  startLocation={item.trip_route.start}
                  endLocation={item.trip_route.end}
                  removeFromList={removeFromList}
                  tripStatus={item.trip_status}
                  token={token}
                />
              )
            }}
            keyExtractor={item => item.trip_id}
          />
        </SafeAreaView>
      )
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ flex: 1 }}
      >
        <EmptyState
          image={noTrips}
          text={
            isRequestedTrips
              ? 'No has agendado viajes'
              : 'No tienes viajes pendientes'
          }
        />
      </ScrollView>
    )
  }
}

MyTrips.propTypes = {
  trips: PropTypes.array,
  driverTrips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onPressTrip: PropTypes.func.isRequired,
  removeFromList: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
}

MyTrips.defaultProps = {
  trips: [],
  driverTrips: [],
  isRequestedTrips: false,
}

export default MyTrips
