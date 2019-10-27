import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TripDetails from '../components/Trips/Trip/TripDetails'

class TripDetailsScreen extends Component {
  static navigationOptions = {
    title: 'Detalle Viaje',
  }

  render() {
    const { navigation } = this.props
    const { userData } = navigation.state.params

    return (
      <TripDetails
        avatar={userData.avatar}
        firstName={userData.first_name}
        lastName={userData.last_name}
        phone={userData.phone}
        dniVerified={userData.dniVerified}
        licenseVerified={userData.licenseVerified}
        isReserved={userData.isReserved}
        tripRoutePoints={userData.trip_route_points}
        etd={userData.etd_info.etd}
      />
    )
  }
}

TripDetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.object.isRequired,
  }).isRequired,
}

export default (TripDetailsScreen)
