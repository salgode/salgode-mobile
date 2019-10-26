import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import CurrentStop from '../../components/CurrentTrip/CurrentStop'

class CurrentStopScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trip: this.props.navigation.getParam('trip', null),
      tripManifest: this.props.navigation.getParam('manifest', null),
    }

    this.onPressCompleteTrip = this.onPressCompleteTrip.bind(this)
  }

  onPressCompleteTrip(trip) {
    const token = this.props.navigation.getParam('token', null)
    this.props.navigation.navigate('FinishTrip', { trip, token })
  }

  render() {
    return (
      <CurrentStop
        trip={this.state.trip}
        tripManifest={this.state.tripManifest}
        stopIndex={0}
        before={0} //todo revisar esto del before y el after, ahora esta todo malo
        after={1}
        onPressCompleteTrip={this.onPressCompleteTrip}
      />
    )
  }
}

CurrentStopScreen.propTypes = {}

export default withNavigation(CurrentStopScreen)
