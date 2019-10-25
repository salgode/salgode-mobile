import React, { Component } from 'react'
import CurrentStop from '../../components/CurrentTrip/CurrentStop'

class CurrentStopScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      trip: this.props.trip,
      tripManifest: this.props.tripManifest,
    };
  }

  render() {
    return (
      <CurrentStop
        trip={this.state.trip}
        tripManifest={this.state.tripManifest}
        stopIndex={0}
        before={0} //todo revisar esto del before y el after, ahora esta todo malo
        after={1}
      />
    )
  }
}

CurrentStopScreen.propTypes = {}

export default CurrentStopScreen
