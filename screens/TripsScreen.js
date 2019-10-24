import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Trips from '../components/Trips/Trips'
import { Spinner, Text } from 'native-base'
import { connect } from 'react-redux'
import { userTrips } from '../redux/actions/user'

class TripsScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      trips: [],
    }

    this.getTrips = this.getTrips.bind(this)
    this.onPressTrip = this.onPressTrip.bind(this)
  }

  onPressTrip(asDriver, tripId) {
    this.props.navigation.navigate('DetailedTrip', { tripId, asDriver })
  }

  componentDidMount() {
    this.getTrips()
  }

  async fetchTrips(/* token */) {
    // eslint-disable-next-line no-console
    // console.log(
    //   `TODO: get trips corresponding to the token ${token}`,
    //   'pax or driver depending on this.props.isRequestedTrips'
    // )

    // const fetcher = this.props.isRequestedTrips
    //   ? fetchFutureTripsByPaxId
    //   : fetchFutureTripsByDriverId

    // fetch from server
    return [
      {
        route_points: [
          'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
          'spt_37d2f127-2269-4c24-b090-4c2d083721a0',
          'spt_0ced4c19-c0b0-4d4c-b2fe-7e14d0740ca2',
        ],
        trip_id: 'tri_a55e3a1e-be31-4c7e-aed4-81da8841e2a1',
        etd: '2019-10-21T20:39:21.546Z',
        status: 'pending',
        spaces_used: 3,
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
      },
      {
        timestamp: 1571590002,
        route_points: [
          'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
          'spt_37d2f127-2269-4c24-b090-4c2d083721a0',
          'spt_0ced4c19-c0b0-4d4c-b2fe-7e14d0740ca2',
        ],
        trip_id: 'tri_a55e3a1e-be31-4c7e-aed4-81da8841e2a1',
        etd: '2019-10-21T20:39:21.546Z',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        spaces_used: 3,
        status: 'accepted',
      },
    ]
  }

  async getTrips() {
    this.setState({ loading: true })
    await this.props.fetchTrips(this.props.user.token)
    this.setState({ loading: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.asDriver}</Text>
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <Trips
            key={`trips-${this.props.isRequestedTrips ? 'requested' : ''}`}
            isRequestedTrips={this.props.isRequestedTrips}
            trips={this.props.trips}
            onPressTrip={this.onPressTrip}
          />
        )}
      </View>
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
  trips: PropTypes.array,
}

TripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

const mapStateToProps = state => ({
  user: state.user,
  trips: state.user.trips,
})

const mapDispatchToProps = dispatch => ({
  fetchTrips: token => dispatch(userTrips(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsScreen)
