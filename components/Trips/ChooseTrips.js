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
    this.handleOnPress = this.handleOnPress.bind(this)
  }

  componentDidMount() {
    this.onReload()
  }

  async onReload() {
    this.setState({ loading: true })
    await this.props.onReload()
    this.setState({ loading: false })
  }

  handleOnPress(trip_id) {
    const { trips } = this.props
    const selectedTrip = trips.find(x => x.trip_id === trip_id)
    const { driver, trip_route_points, etd_info, trip_status } = selectedTrip
    const { driver_verifications } = driver
    if (
      driver &&
      driver_verifications &&
      trip_route_points &&
      etd_info &&
      trip_status
    ) {
      this.props.navigation.navigate('TripDetails', {
        userData: {
          avatar: driver.driver_avatar,
          first_name: driver.driver_name,
          phone: driver.driver_phone,
          dniVerified: driver_verifications.identity,
          licenseVerified: driver_verifications.driver_license,
          trip_route_points: trip_route_points,
          etd_info: etd_info,
          isReserved: trip_status !== 'open',
        },
      })
    }
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
      <SafeAreaView style={{ flex: 1, marginHorizontal: 15 }}>
        <FlatList
          data={this.props.trips}
          onRefresh={this.onReload}
          refreshing={this.state.loading}
          renderItem={({ item }) => (
            <ChooseTrip
              timestamp={new Date(item.etd_info.etd)}
              driver={item.driver}
              stops={item.trip_route_points}
              onSend={this.props.onSend}
              tripId={item.trip_id}
              onPress={() => this.handleOnPress(item.trip_id)}
            />
          )}
          keyExtractor={item => item.trip_id}
          style={styles.flatList}
        />
      </SafeAreaView>
    )
  }
}

ChooseTrips.propTypes = {
  trips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onSend: PropTypes.func.isRequired,
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
