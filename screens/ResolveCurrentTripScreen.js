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

    this.props.fetchCurrentTrip(userToken).then(async data => {
      if (data.payload) {
        const trip = await this.props
          .fetchTrip(userToken, data.payload.trip_id)
          .then(response => response.payload.data)
        const manifest = await this.props
          .fetchManifest(userToken, data.payload.trip_id)
          .then(response => response.payload.data)

        this.props.navigation.navigate('StopTrip', {
          trip,
          userToken,
          manifest,
          // asDriver: JSON.parse(data.payload.data.is_driver),
          asDriver: true,
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
