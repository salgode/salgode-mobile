import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Trips from '../components/Trips/Trips'
import { Spinner, Text } from 'native-base'
import { connect } from 'react-redux'
import { userTrips, driverTrips } from '../redux/actions/user'

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
    }

    this.getTrips = this.getTrips.bind(this)
    this.onPressTrip = this.onPressTrip.bind(this)
  }

  onPressTrip(asDriver = false, trip) {
    this.props.navigation.navigate('DetailedTrip', {
      asDriver: this.state.asDriver,
      trip,
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
      this.props.user.verifications.license &&
      this.props.user.vehicles.length
    )
  }
  render() {
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
            />
          )}
        </View>
      )
    } else {
      //not verified driver
      return (
        <View style={styles.viewContainer}>
          <Text>
            Para crear viajes debes registrar tu auto y enviar una foto por
            ambos lados de tu licencia.
          </Text>
        </View>
      )
    }
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsScreen)
