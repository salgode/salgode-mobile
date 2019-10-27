import React, { Component } from 'react'
import {
  withNavigation,
  StackActions,
  NavigationActions,
} from 'react-navigation'
import FinishedTrip from '../../components/CurrentTrip/FinishedTrip'

class CurrentFinishScreen extends Component {
  constructor(props) {
    super(props)
    this.onPressFinishTrip = this.onPressFinishTrip.bind(this)
  }

  onPressFinishTrip() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Trips' })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const trip = this.props.navigation.getParam('trip', null)
    const location = trip.trip_route.end.name
    const tripId = trip.trip_id
    const token = this.props.navigation.getParam('token', null)
    return (
      <FinishedTrip
        location={location}
        token={token}
        tripId={tripId}
        onPress={() => this.onPressFinishTrip()}
      />
    )
  }
}

CurrentFinishScreen.propTypes = {}

export default withNavigation(CurrentFinishScreen)
