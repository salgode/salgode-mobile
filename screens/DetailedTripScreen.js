import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import DetailedTrip from '../components/Trips/Trip/DetailedTrip'
import { Spinner } from 'native-base'
import TripRequestCard from '../components/Trips/Trip/TripRequestCard'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { fetchTrip, startJourney } from '../redux/actions/trips'
import { getTripReservations } from '../utils/getTripInfo'

class DetailedTripScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      trip: null,
      reservations: [],
      asDriver: false,
    }

    this.renderPassengers = this.renderPassengers.bind(this)
    this.onPressStartTrip = this.onPressStartTrip.bind(this)
  }

  async componentDidMount() {
    // TODO: get token from redux store
    this.setState({ loading: true })
    const asDriver = this.props.navigation.getParam('asDriver', null)
    const trip = this.props.navigation.getParam('trip', null)
    this.setState({ trip, asDriver })

    if (asDriver) {
      const reservations = await getTripReservations(
        this.props.user.token,
        trip.trip_id
      )
      // console.log('Aca', reservations)
      // console.log(asDriver)
      this.setState({ loading: false })
      if (!reservations || reservations.message) {
        alert(
          'Hubo un problema obteniendo las reservas. Por favor intentalo de nuevo.'
        )
      } else {
        this.setState({ reservations })
      }
    } else {
      this.setState({ loading: false })
    }
  }

  onPressStartTrip() {
    this.props.navigation.navigate('StartTrip', {
      stops: this.state.trip.trip_route_points,
      onTripStart: () =>
        this.props.postTripStart(
          this.props.user.token,
          this.state.trip.trip_id
        ),
      nextTripView: () => {
        this.props.navigation.navigate('StopTrip', {
          token: this.props.user.token,
          trip: this.state.trip,
          manifest: this.state.trip.manifest,
          asDriver: this.props.navigation.getParam('asDriver', null),
        })
      },
    })
  }

  renderPassengers() {
    if (!this.state.trip) {
      return null
    }

    const finishStop = this.state.trip.trip_route.end.name
    return this.state.reservations.length > 0
      ? this.state.reservations.map((reservation, index) => {
          return (
            <TripRequestCard
              key={`passenger-${index}`}
              reservation={reservation}
              finishStop={finishStop}
              // slot={this.props.slots[index]}
              token={this.props.user.token}
            />
          )
        })
      : null
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <DetailedTrip
            asDriver={this.state.asDriver}
            trip={this.state.trip}
            driver={this.state.trip.driver}
            onPressStartTrip={() => this.onPressStartTrip()}
          />
        )}
        {this.state.asDriver && !this.state.loading
          ? this.renderPassengers()
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
  // trip: PropTypes.object.isRequired,
  // slots: PropTypes.object.isRequired,
  fetchTrip: PropTypes.func.isRequired,
  postTripStart: PropTypes.func.isRequired,
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
  postTripStart: (token, id) => dispatch(startJourney(token, id)),
  // fetchSlots:()=>(),
})

export default connect(
  mapPropsToState,
  mapDispatchToState
)(withNavigation(DetailedTripScreen))
