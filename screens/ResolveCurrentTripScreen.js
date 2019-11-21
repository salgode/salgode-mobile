import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native'
import { Spinner } from 'native-base'
import { connect } from 'react-redux'
import { getCurrentTrip } from '../redux/actions/user'
import PropTypes from 'prop-types'
import { fetchTrip, fetchTripManifest } from '../redux/actions/trips'

class ResolveCurrentTripScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
    }

    this.currentHandler = this.currentHandler.bind(this)
  }

  async currentHandler() {
    const userToken = await AsyncStorage.getItem('@userToken').then(data =>
      JSON.parse(data)
    )

    this.props.fetchCurrentTrip(userToken).then(async response => {
      if (response.payload && Object.keys(response.payload.data).length) {
        if (response.payload.data.is_driver === false) {
          return this.props.navigation.navigate('Main')
        }

        const trip = await this.props
          .fetchTrip(userToken, response.payload.data.trip_id)
          .then(response => response.payload.data)
          .catch(() => null)
        const manifest = await this.props
          .fetchManifest(userToken, response.payload.data.trip_id)
          .then(response => response.payload.data)
          .catch(() => null)

        if (!trip || !manifest) {
          return this.props.navigation.navigate('Main')
        }

        this.props.navigation.navigate('StopTrip', {
          trip: {
            ...trip,
            manifest,
            next_point: response.payload.data.next_point,
            on_board: response.payload.data.on_board,
            available_seats: response.payload.data.available_seats,
          },
          token: userToken,
          asDriver: response.payload.data.is_driver,
        })
      } else {
        this.props.navigation.navigate('Main')
      }
    })
  }

  componentDidMount() {
    this.currentHandler()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner color="blue" />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

ResolveCurrentTripScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fetchCurrentTrip: PropTypes.func.isRequired,
  fetchManifest: PropTypes.func.isRequired,
  fetchTrip: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  trip: state.trips.trip,
  // slots: state.trips.trip.slots,
})

const mapDispatchToProps = dispatch => ({
  fetchTrip: (token, id) => dispatch(fetchTrip(token, id)),
  fetchCurrentTrip: token => dispatch(getCurrentTrip(token)),
  fetchManifest: (token, id) => dispatch(fetchTripManifest(token, id)),

  // fetchSlots:()=>(),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResolveCurrentTripScreen)
