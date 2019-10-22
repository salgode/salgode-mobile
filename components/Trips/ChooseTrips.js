import React, { Component } from 'react'
import { FlatList, SafeAreaView, View, ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import ChooseTrip from './Trip/ChooseTrip'

class ChooseTrips extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.ChooseTrip = ChooseTrip
    this.onReload = this.onReload.bind(this)
  }

  componentDidMount() {
    this.onReload()
  }

  async onReload() {
    this.setState({ loading: true })
    await this.props.onReload()
    this.setState({ loading: false })
  }

  render() {
    const Trip = this.ChooseTrip
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color="#0000FF" marginTop={20} />
        </View>
      )
    }
    return (
      <SafeAreaView>
        <FlatList
          data={this.props.trips}
          onRefresh={this.onReload}
          refreshing={this.state.loading}
          renderItem={({ item }) => (
            <Trip
              timestamp={item.timestamp}
              user={item.user}
              status={item.status}
              stops={item.stops}
              onSend={() => this.props.onSend(item.stops, item.tripId)}
            />
          )}
          keyExtractor={item => item.tripId}
        />
      </SafeAreaView>
    )
  }
}

ChooseTrips.propTypes = {
  trips: PropTypes.array,
  isRequestedTrips: PropTypes.bool,
  onSend: PropTypes.func,
  onReload: PropTypes.func.isRequired,
}

ChooseTrips.defaultProps = {
  trips: [],
  isRequestedTrips: false,
}

export default ChooseTrips
