import React, { Component } from 'react'
import {
  FlatList,
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { withNavigation } from 'react-navigation'
import PropTypes from 'prop-types'
import ChooseTrip from './Trip/ChooseTrip'

class ChooseTrips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      stops: [],
    }
    this.onReload = this.onReload.bind(this)
  }

  componentDidMount() {
    this.onReload()
  }

  async onReload() {
    this.setState({ loading: true })
    await this.props.onReload()
    this.setState({ loading: false })
  }

  handleOnPress(tripId) {
    const { trips } = this.props
    const selectedTrip = trips.find(x => x.tripId == tripId)

    this.props.navigation.navigate('TripDetails', {
      userData: {
        avatar: selectedTrip.driver.avatar,
        first_name: selectedTrip.driver.name,
        last_name: 'TODO: lastName',
        phone: selectedTrip.driver.phone,
        dniVerified:
          selectedTrip.vehicle.vehicle_identifications.identification_verified,
        licenseVerified:
          selectedTrip.vehicle.vehicle_identifications.identification_verified,
        trip_route_points: selectedTrip.trip_route_points,
        etd_info: selectedTrip.etd_info,
        isReserved: false, // TODO: need to obtain reservation status
      },
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000FF" marginTop={20} />
        </View>
      )
    }

    return (
      <SafeAreaView>
        <FlatList
          data={this.props.trips}
          onRefresh={this.onReload}
          refreshing={this.state.loading}
          renderItem={({ item }) => (
            <ChooseTrip
              timestamp={item.timestamp}
              driver={item.driver}
              stops={item.stops}
              onSend={this.props.onSend}
              tripId={item.tripId}
              onPress={() => this.handleOnPress(item.tripId)}
            />
          )}
          keyExtractor={item => item.tripId}
          style={styles.flatList}
        />
      </SafeAreaView>
    )
  }
}

ChooseTrips.propTypes = {
  trips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onSend: PropTypes.func,
  onReload: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

ChooseTrips.defaultProps = {
  trips: [],
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  flatList: { height: '100%', width: '100%' },
})

export default withNavigation(ChooseTrips)
