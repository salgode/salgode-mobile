import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import TripStart from '../../components/CurrentTrip/TripStart'

class CurrentStartScreen extends Component {
  constructor(props) {
    super(props)
    this.onPressStartTrip = this.onPressStartTrip.bind(this)
  }

  onPressStartTrip() {
    this.props.navigation.navigate('StopTrip')
  }

  render() {
    const tripStops = this.props.navigation.getParam('tripStops', null)
    const tripId = this.props.navigation.getParam('tripId', null)
    const token = this.props.navigation.getParam('token', null)
    return (
      <TripStart
        stops={tripStops}
        onPressStartTrip={this.onPressStartTrip}
        tripId={tripId}
        token={token}
      />
    )
  }
}

export default withNavigation(CurrentStartScreen)
