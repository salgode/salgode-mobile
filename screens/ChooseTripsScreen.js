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

    this.onSend = this.onSend.bind(this)
    this.getTrips = this.getTrips.bind(this)
  }

  onSend() {
    //fetch to POST new passanger in trip
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
            onSend={this.state.onSend}
            onReload={this.getTrips}
            trips={this.props.trips.map(trip => ({
              timestamp: new Date(trip.etd).getTime(),
              user: {
                name: 'Temp',
                reputation: 0,
              },
              startPoint: trip.route_points[0],
              endPoint: trip.route_points[trip.route_points.length - 1],
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
  // user: PropTypes.shape({
  //   token: PropTypes.string.isRequired,
  // }).isRequired,
  trips: PropTypes.array.isRequired,
}

ChooseTripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f7fc',
    padding: 15,
    paddingBottom: 90,
    ...StyleSheet.absoluteFill,
  },
})

const mapStateToProps = state => {
  console.log(state)
  return {
    user: state.user,
    trips: state.futureTrips.futureTrips || [],
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
