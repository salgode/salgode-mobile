import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import TripStart from '../../components/CurrentTrip/TripStart'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class CurrentStartScreen extends Component {
  constructor(props) {
    super(props)
    this.onPressStartTrip = this.onPressStartTrip.bind(this)
  }

  onPressStartTrip(trip, manifest) {
    const token = this.props.navigation.getParam('token', null)
    this.props.navigation.navigate('StopTrip', { trip, manifest, token })
  }

  render() {
    const { navigation } = this.props
    const stops = navigation.getParam('stops', null)
    const onTripStart = navigation.getParam('onTripStart', null)
    const nextTripView = navigation.getParam('nextTripView', null)
    const startPassengers = navigation.getParam('firstStopPassengers', null)
    const canStart = this.props.driverTrips.every((element, idx, array) => {
      return element.trip_status !== 'in_progress'
    })

    return (
      <TripStart
        stops={stops}
        onTripStart={onTripStart}
        nextTripView={nextTripView}
        startPassengers={startPassengers}
        canStart={canStart}
      />
    )
  }
}

CurrentStartScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  driverTrips: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  trips: state.user.trips,
  driverTrips: state.user.driverTrips,
})

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(CurrentStartScreen))
