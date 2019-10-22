import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'
import { fetchFutureTrips } from '../redux/actions/trips'

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
    }

    this.onRequestTrip = this.onRequestTrip.bind(this)
    this.getTrips = this.getTrips.bind(this)
  }

  onRequestTrip(stops, tripId) {
    this.props.navigation.navigate('RequestTrip', { stops, tripId })
  }

  async getTrips() {
    // console.log(this.props.user)
    const response = await this.props.fetchFutureTrips(this.props.user.token)

    if (response.error) {
      Alert.alert(
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ChooseTrips
            onSend={this.onRequestTrip}
            onReload={this.getTrips}
            trips={this.props.trips.map(trip => ({
              timestamp: new Date(trip.etd).getTime(),
              user: {
                name: 'Temp',
                reputation: 0,
              },
              stops: trip.route_points,
              tripId: trip.trip_id,
            }))}
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
    backgroundColor: '#f4f7fc',
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    trips: state.futureTrips.trips || [],
  }
}

const mapDispatchToProps = dispatch => ({
  fetchFutureTrips: token => dispatch(fetchFutureTrips(token)),
})

ChooseTripsScreen.navigationOptions = {
  title: 'Busca tu viaje',
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTripsScreen)
