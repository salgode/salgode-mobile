import React, { Component } from 'react'
import CurrentStop from '../../components/CurrentTrip/CurrentStop'

class CurrentStopScreen extends Component {
  render() {
    return (
      <CurrentStop
        before={0}
        after={1}
        location="San Joaquin"
        usersToPickUp={[
          {
            name: 'Benja',
            location: 'Camino Agricola',
          },
          {
            name: 'Tomas',
            location: 'Pedrero',
          },
        ]}
      />
    )
  }
}

CurrentStopScreen.propTypes = {}

export default CurrentStopScreen
