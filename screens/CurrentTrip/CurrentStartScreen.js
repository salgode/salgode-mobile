import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import TripStart from '../../components/CurrentTrip/TripStart'

class CurrentStartScreen extends Component {
  render() {
    const tripStops = this.props.navigation.getParam('tripStops', null)
    return (
      <TripStart
        stops={tripStops}
      />
    )
  }
}

export default withNavigation(CurrentStartScreen)
