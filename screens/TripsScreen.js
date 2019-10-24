import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Trips from '../components/Trips/Trips'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { userTrips, driverTrips } from '../redux/actions/user'

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

  onPressTrip(asDriver = false, tripId) {
    this.props.navigation.navigate('DetailedTrip', { asDriver, tripId })
  }

  componentDidMount() {
    this.getTrips()
    this.asDriver = this.props.navigation.getParam('asDriver', null)
  }

  async getTrips() {
    this.setState({ loading: true })

    await this.props.fetchTrips(this.props.user.token)
    await this.props.fetchDriverTrips(this.props.user.token)
    this.setState({ loading: false })
  }

  render() {
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
})

const mapStateToProps = state => ({
  user: state.user,
  trips: state.user.trips,
  driverTrips: state.user.driverTrips,
})

const mapDispatchToProps = dispatch => ({
  fetchTrips: token => dispatch(userTrips(token)),
  fetchDriverTrips: token => dispatch(driverTrips(token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsScreen)
