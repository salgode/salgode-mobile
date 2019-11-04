import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import TripStart from '../../components/CurrentTrip/TripStart'
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
    const stops = this.props.navigation.getParam('stops', null)
    const onTripStart = this.props.navigation.getParam('onTripStart', null)
    const nextTripView = this.props.navigation.getParam('nextTripView', null)
    return (
      <TripStart
        stops={stops}
        onTripStart={onTripStart}
        nextTripView={nextTripView}
      />
    )
  }
}

CurrentStartScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default withNavigation(CurrentStartScreen)
