import React, { Component } from 'react'
import TripStart from '../../components/CurrentTrip/TripStart'

class CurrentStartScreen extends Component {
  render() {
    return (
      <TripStart
        stops={['Escuela Militar', 'Principe de Gales', 'San Joaquín']}
      />
    )
  }
}

export default CurrentStartScreen
