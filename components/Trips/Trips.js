import React, { Component } from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
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
    } = this.props
    const Trip = isRequestedTrips ? RequestedTrip : MyTrip
    const tripsData = isRequestedTrips ? trips : driverTrips
    let filteredData
    if (isRequestedTrips) {
      filteredData = tripsData
        ? tripsData.filter(t =>
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
                  asDriver={this.asDriver}
                  onPressTrip={onPressTrip}
                  trip={item}
                  startLocation={item.trip_route.start}
                  endLocation={item.trip_route.end}
                  removeFromList={removeFromList}
                />
              )
            }}
            keyExtractor={item => item.trip_id}
          />
        </SafeAreaView>
      )
    }
    return (
      <EmptyState
        image={noTrips}
        text={isRequestedTrips
          ? 'No has agendado viajes'
          : 'No tienes viajes pendientes'}
      />
    )
  }
}

MyTrips.propTypes = {
  trips: PropTypes.array,
  driverTrips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onPressTrip: PropTypes.func.isRequired,
}

MyTrips.defaultProps = {
  trips: [],
  driverTrips: [],
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export default MyTrips
