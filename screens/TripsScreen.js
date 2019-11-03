import React, { Component } from 'react'
import { View, StyleSheet, RefreshControl, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import Trips from '../components/Trips/Trips'
import { Spinner, Text } from 'native-base'
import { connect } from 'react-redux'
import { userTrips, driverTrips, removeTrip } from '../redux/actions/user'
import EmptyState from '../components/EmptyState/EmptyState'
import noTrips from '../assets/images/notrips.png'

class TripsScreen extends Component {
  static navigationOptions = {
    title: '#Manejando',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      trips: [],
      asDriver: false,
      reloading: false,
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.getTrips = this.getTrips.bind(this)
    this.onPressTrip = this.onPressTrip.bind(this)
    this.renderScreen = this.renderScreen.bind(this)
  }

  async onRefresh() {
    this.setState({ reloading: true })
    await this.props.fetchTrips(this.props.user.token)
    await this.props.fetchDriverTrips(this.props.user.token)
    this.setState({ reloading: false })
  }

  onPressTrip(asDriver = false, trip) {
    this.props.navigation.navigate('DetailedTrip', {
      asDriver: this.state.asDriver,
      trip_id: trip.trip_id,
    })
  }

  componentDidMount() {
    this.getTrips()
    const asDriver = this.props.navigation.getParam('asDriver', null)
    this.setState({ asDriver })
  }

  async getTrips() {
    this.setState({ loading: true })
    await this.props.fetchTrips(this.props.user.token)
    await this.props.fetchDriverTrips(this.props.user.token)
    this.setState({ loading: false })
  }

  isVerifiedDriver = () => {
    return (
      this.props.user.verifications.license && this.props.user.vehicles.length
    )
  }

  renderScreen() {
    if (!this.props.user.email) {
      return <></>
    }
    const isConfirmedDriver = this.isVerifiedDriver()

    if (isConfirmedDriver || this.props.type === 'pedidos') {
      return (
        <View style={styles.container}>
          {this.state.loading && <Spinner color="blue" />}
          {!this.state.loading && (
            <Trips
              key={`trips-${this.props.isRequestedTrips ? 'requested' : ''}`}
              isRequestedTrips={this.props.isRequestedTrips}
              trips={this.props.trips}
              onPressTrip={this.onPressTrip}
              driverTrips={this.props.driverTrips}
              removeFromList={this.props.dispatchRemoveTrip}
            />
          )}
        </View>
      )
    } else {
      //not verified driver
      return (
        <EmptyState
          image={noTrips}
          text="Para crear viajes debes registrar tu auto y enviar una foto por ambos lados de tu licencia"
        />
      )
    }
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.reloading}
            onRefresh={this.onRefresh}
          />
        }
        contentContainerStyle={{ flex: 1 }}
      >
        {this.renderScreen()}
      </ScrollView>
    )
  }
}

TripsScreen.propTypes = {
  isRequestedTrips: PropTypes.bool,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  fetchTrips: PropTypes.func.isRequired,
  fetchDriverTrips: PropTypes.func.isRequired,
  trips: PropTypes.array,
  driverTrips: PropTypes.array,
}

TripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
  viewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

const mapStateToProps = state => ({
  user: state.user,
  trips: state.user.trips,
  driverTrips: state.user.driverTrips,
})

const mapDispatchToProps = dispatch => ({
  fetchTrips: token => dispatch(userTrips(token)),
  fetchDriverTrips: token => dispatch(driverTrips(token)),
  dispatchRemoveTrip: tripId => dispatch(removeTrip(tripId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsScreen)
