import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import DetailedTrip from '../components/Trips/Trip/DetailedTrip'
import { Spinner, Text, H3 } from 'native-base'
import TripRequestCard from '../components/Trips/Trip/TripRequestCard'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import {
  fetchTrip,
  startJourney,
  fetchTripManifest,
} from '../redux/actions/trips'
import { getTripReservations } from '../redux/actions/trips'
import PassengerDetails from '../components/Trips/Trip/PassengerDetails'

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
      fetchingPassengers: false,
      fetchingReservations: false,
      passengers: [],
    }

    this.renderPassengers = this.renderPassengers.bind(this)
    this.renderReservations = this.renderReservations.bind(this)
    this.onPressStartTrip = this.onPressStartTrip.bind(this)
    this.toCurrentTrip = this.toCurrentTrip.bind(this)
    this.updateReservations = this.updateReservations.bind(this)
  }

  async componentDidMount() {
    this.setState({ loading: true })
    const asDriver = this.props.navigation.getParam('asDriver', null)
    const trip_id = this.props.navigation.getParam('trip_id', null)
    await this.props.fetchTrip(this.props.user.token, trip_id)
    this.setState({ ...this.state, asDriver, loading: false })
    if (asDriver) {
      const params = [this.props.user.token, trip_id]
      this.setState({ fetchingPassengers: true, fetchingReservations: true })
      const passengers = await this.props.fetchManifest(...params)
      const reservations = await this.props.fetchReservations(...params)
      if (
        !reservations ||
        !passengers ||
        reservations.error ||
        passengers.error
      ) {
        Alert.alert(
          'Problemas obteniendo detalles del viaje',
          'Hubo un problema obteniendo algunos detalles de tu viaje. Por favor inténtalo de nuevo.'
        )
      }
      if (reservations && !reservations.error) {
        this.setState({ reservations: reservations.payload.data })
      }
      if (passengers && !passengers.error) {
        this.setState({ passengers: passengers.payload.data.passengers })
      }
      this.setState({ fetchingPassengers: false, fetchingReservations: false })
    }
  }

  async updateReservations(status, reservationId) {
    const { reservations, trip } = this.state
    const { user } = this.props
    switch (status) {
      case 'accepted':
        const params = [user.token, trip.trip_id]
        this.setState({
          reservations: reservations.filter(
            i => reservationId !== i.reservation_id
          ),
          fetchingPassengers: true,
        })
        const passengers = await this.props.fetchManifest(...params)
        if (!passengers || passengers.error) {
          Alert.alert(
            'Problemas obteniendo detalles del viaje',
            'Hubo un problema obteniendo algunos detalles de tu viaje. Por favor inténtalo de nuevo.'
          )
        } else {
          this.setState({ passengers: passengers.payload.data.passengers })
        }
        this.setState({ fetchingPassengers: false })
        break
      case 'declined':
        this.setState({
          reservations: reservations.filter(
            i => reservationId !== i.reservation_id
          ),
        })
        break
      default:
        console.warn('Invalid status')
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.trip !== prevState.trip) {
      return { trip: nextProps.trip }
    }
    if (nextProps.trip.manifest !== prevState.trip.manifest) {
      return { trip: { ...prevState.trip, manifest: nextProps.trip.manifest } }
    }
    return null
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
          asDriver: this.props.navigation.getParam('asDriver', null),
        })
      },
    })
  }

  async toCurrentTrip() {
    const trip = await this.props
      .fetchTrip(this.props.user.token, this.state.trip.trip_id)
      .then(response => response.payload.data)
      .catch(() => null)
    const manifest = await this.props
      .fetchManifest(this.props.user.token, this.state.trip.trip_id)
      .then(response => response.payload.data)
      .catch(() => null)
    if (!trip || !manifest) {
      this.props.navigation.navigate('Main')
      return
    }

    this.props.navigation.navigate('StopTrip', {
      trip: {
        ...trip,
        manifest,
      },
      userToken: this.props.user.token,
      asDriver: true,
    })
  }

  renderPassengers() {
    const { trip, passengers, fetchingPassengers } = this.state
    if (!trip || !trip.trip_route || !trip.trip_route.end) {
      return <></>
    }
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.headerTitle}>
          <H3>Pasajeros</H3>
        </View>
        {fetchingPassengers && <Spinner color="blue" />}
        {!fetchingPassengers && (
          <View>
            {passengers.length ? (
              passengers.map((reservation, index) => {
                const {
                  passenger_avatar,
                  passenger_name,
                  passenger_phone,
                  passenger_verifications,
                  trip_route,
                } = reservation
                return (
                  <PassengerDetails
                    key={`passenger-${index}`}
                    avatar={passenger_avatar}
                    name={passenger_name}
                    phone={passenger_phone}
                    verified={passenger_verifications.identity}
                    start={trip_route.start.place_name}
                  />
                )
              })
            ) : (
              <Text style={styles.noContent}>
                Aún no tienes pasajeros para este viaje
              </Text>
            )}
          </View>
        )}
      </View>
    )
  }

  renderReservations() {
    const { trip, reservations, fetchingReservations } = this.state
    if (!trip || !trip.trip_route || !trip.trip_route.end) {
      return <></>
    }
    if (trip.trip_status !== 'open') {
      return <></>
    }
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.headerTitle}>
          <H3>Los siguientes usuarios quieren unirse a tu viaje</H3>
        </View>
        {fetchingReservations && <Spinner color="blue" />}
        {!fetchingReservations && (
          <View>
            {reservations.length ? (
              reservations.map((reservation, index) => {
                return (
                  <TripRequestCard
                    key={`reservation-${index}`}
                    reservation={reservation}
                    passenger={reservation.passenger}
                    places={reservation.reservation_route_places}
                    status={reservation.reservation_status}
                    trip={trip}
                    updateReservations={this.updateReservations}
                  />
                )
              })
            ) : (
              <Text style={styles.noContent}>
                Aún no tienes solicitudes para este viaje
              </Text>
            )}
          </View>
        )}
      </View>
    )
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
            toCurrentTrip={this.toCurrentTrip}
          />
        )}
        {this.state.asDriver && !this.state.loading
          ? this.renderPassengers()
          : null}
        {this.state.asDriver && !this.state.loading
          ? this.renderReservations()
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
  fetchTrip: PropTypes.func.isRequired,
  fetchManifest: PropTypes.func.isRequired,
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
  headerTitle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  noContent: {
    color: 'gray',
    textAlign: 'center',
  },
  sectionContainer: {
    margin: 20,
  },
})

const mapPropsToState = state => ({
  user: state.user,
  trip: state.trips.trip,
  manifest: state.trips.trip.manifest,
})

const mapDispatchToState = dispatch => ({
  fetchTrip: (token, id) => dispatch(fetchTrip(token, id)),
  postTripStart: (token, id) => dispatch(startJourney(token, id)),
  fetchManifest: (token, id) => dispatch(fetchTripManifest(token, id)),
  fetchReservations: (token, id) => dispatch(getTripReservations(token, id)),
})

export default connect(
  mapPropsToState,
  mapDispatchToState
)(withNavigation(DetailedTripScreen))
