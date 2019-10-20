import React, { Component } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'
import ChooseTrip from './Trip/ChooseTrip'

class ChooseTrips extends Component {
  constructor(props) {
    super(props)
    this.ChooseTrip = ChooseTrip
  }

  render() {
    const Trip = this.ChooseTrip
    return (
      <SafeAreaView>
        <FlatList
          data={this.props.trips}
          renderItem={({ item }) => (
            <Trip
              timestamp={item.timestamp}
              spacesUsed={item.spacesUsed}
              user={item.user}
              status={item.status}
              onSend={this.props.onSend}
            />
          )}
        />
      </SafeAreaView>
    )
  }
}

ChooseTrips.propTypes = {
  trips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onSend: PropTypes.func,
}

ChooseTrips.defaultProps = {
  trips: [],
  isRequestedTrips: false,
}

export default ChooseTrips
