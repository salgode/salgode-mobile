import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import DetailedTrip from '../components/Trips/Trip/DetailedTrip'
import { Spinner } from 'native-base'
import TripRequestCard from '../components/Trips/Trip/TripRequestCard'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { fetchTrip } from '../redux/actions/trips'

class DetailedTripScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }

    this.renderPassengers = this.renderPassengers.bind(this)
    this.onPressStartTrip = this.onPressStartTrip.bind(this)
  }

  componentDidMount() {
    // TODO: get token from redux store
    this.asDriver = this.props.navigation.getParam('asDriver', null)
    const tripId = this.props.navigation.getParam('tripId', null)
    // if (asDriver) {
    //   this.props.fetchTripDriver(this.props.user.token, tripId)
    // } else {
    this.props.fetchTrip(this.props.user.token, tripId).then(() => {
      this.setState({ loading: false })
    })
    // }
    // this.props.fetchSlots(this.props.user.token, tripId)
  }

  onPressStartTrip(tripStops, tripId, token, trip) {
    this.props.navigation.navigate('StartTrip', { tripStops, tripId, token, trip })
  }

  renderPassengers(passengers) {
    const finishStop = this.props.trip
      ? this.props.trip.trip_route_points[
          this.props.trip.trip_route_points.length - 1
        ].name
      : 'cargando..'
    return passengers
      ? passengers.map((passenger, index) => (
          <TripRequestCard
            key={`passenger-${index}`}
            passenger={passenger}
            finishStop={finishStop}
            // slot={this.props.slots[index]}
            token={this.props.user.token}
          />
        ))
      : null
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <DetailedTrip
            asDriver={this.asDriver}
            trip={this.props.trip}
            driver={this.props.trip.driver}
            token={this.props.user.token}
            onPressStartTrip={this.onPressStartTrip}
          />
        )}
        {this.state.asDriver && !this.state.loading
          ? this.renderPassengers(this.state.passengers, this.state.token)
          : null}
      </ScrollView>
    )
  }
}

DetailedTripScreen.propTypes = {
  asDriver: PropTypes.bool,
  tripId: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  trip: PropTypes.object.isRequired,
  // slots: PropTypes.object.isRequired,
  fetchTrip: PropTypes.func.isRequired,
}

DetailedTripScreen.defaultProps = {
  asDriver: false,
  tripId: '0',
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

const mapPropsToState = state => ({
  user: state.user,
  trip: state.trips.trip,
  // slots: state.trips.trip.slots,
})

const mapDispatchToState = dispatch => ({
  fetchTrip: (token, id) => dispatch(fetchTrip(token, id)),
  // fetchSlots:()=>(),
})

export default connect(
  mapPropsToState,
  mapDispatchToState
)(withNavigation(DetailedTripScreen))
