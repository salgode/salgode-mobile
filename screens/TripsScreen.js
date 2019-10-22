import React, { Component } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import Trips from '../components/Trips/Trips'
import { Spinner, Text } from 'native-base'

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
    this.fetchTrips = this.fetchTrips.bind(this)
    this.onPressTrip = this.onPressTrip.bind(this)
  }

  onPressTrip(asDriver) {
    this.props.navigation.navigate('DetailedTrip', { asDriver })
  }

  componentDidMount() {
    this.getTrips(123)
  }

  async fetchTrips(token) {
    // eslint-disable-next-line no-console
    console.log(token)
    // fetch from server
    return [
      {
        timestamp: 1571590002,
        spacesUsed: 3,
        tripId: '0',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'accepted',
      },
      {
        timestamp: 1571503602,
        spacesUsed: 3,
        tripId: '1',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'pending',
      },
      {
        timestamp: 1571586402,
        spacesUsed: 3,
        tripId: '2',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'rejected',
      },
      {
        timestamp: 1570985202,
        spacesUsed: 3,
        tripId: '3',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'accepted',
      },
      {
        timestamp: 1571593602,
        spacesUsed: 3,
        tripId: '4',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'accepted',
      },
      {
        timestamp: 1571676402,
        spacesUsed: 3,
        tripId: '5',
        user: {
          name: 'Benjamin',
          reputation: 17,
        },
        status: 'accepted',
      },
    ]
  }

  async getTrips(token) {
    this.setState({ loading: true })

    await this.fetchTrips(token)
      .then(trips => this.setState({ trips }))
      .catch(err => {
        this.setState({ loading: false })
        Alert.alert('Hubo un error, intenta de nuevo más tarde', err)
      })

    this.setState({ loading: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.asDriver}</Text>
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <Trips
            isRequestedTrips={this.props.isRequestedTrips}
            trips={this.state.trips}
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

export default TripsScreen
