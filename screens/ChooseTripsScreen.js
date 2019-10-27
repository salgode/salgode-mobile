import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'
import { fetchFutureTrips } from '../redux/actions/trips'
import Colors from '../constants/Colors'
import lang from '../languages/es'

const parseTripInfo = trip => {
  const { driver } = trip
  return {
    ...trip,
    timestamp: new Date(trip.etd_info.etd),
    driver: {
      name: driver.driver_name,
      phone: driver.driver_phone,
      reputation: driver.driver_score,
      id: driver.driver_id,
      //TODO Ajustar al response del server.
      avatar: driver.driver_avatar || '',
    },
    stops: trip.trip_route_points,
    tripId: trip.trip_id,
    trip_route: trip.trip_route,
  }
}

class ChooseTripsScreen extends Component {
  static navigationOptions = {
    // title: 'Pedir Viaje',
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      avalibleTrips: null,
      rerender: true,
      trips: [],
    }

    this.onRequestTrip = this.onRequestTrip.bind(this)
    this.getTrips = this.getTrips.bind(this)
    // console.log(this.props.user)
  }

  async componentDidMount() {
    await this.getTrips()
  }

  onRequestTrip(stops, tripId) {
    this.props.navigation.navigate('RequestTrip', {
      stops: stops,
      tripId,
    })
  }

  async getTrips() {
    const response = await this.props.fetchFutureTrips(this.props.user.token)
    if (response.error) {
      Alert.alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.trips })
  }

  render() {
    // console.log(this.state.trips[0])
    return (
      <View style={styles.container}>
        <View>
          <ChooseTrips
            onSend={this.onRequestTrip}
            onReload={this.getTrips}
            trips={this.state.trips.map(trip => parseTripInfo(trip))}
          />
        </View>
      </View>
    )
  }
}

ChooseTripsScreen.propTypes = {
  isRequestedTrips: PropTypes.bool,
  fetchFutureTrips: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  trips: PropTypes.array.isRequired,
}

ChooseTripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightBackground,
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    trips: state.trips.open || [],
  }
}

const mapDispatchToProps = dispatch => ({
  fetchFutureTrips: token => dispatch(fetchFutureTrips(token)),
})

ChooseTripsScreen.navigationOptions = {
  title: 'Busca tu viaje',
  headerBackTitle: lang.default.back,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTripsScreen)
