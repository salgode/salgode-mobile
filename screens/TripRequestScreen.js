import React, { Component } from 'react'
import { Spinner } from 'native-base'
// import PropTypes from 'prop-types'
import TripRequest from '../components/Trips/TripRequest'

class TripRequestScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      stops: null,
    }
  }

  componentDidMount() {
    const stops = this.props.navigation.getParam('stops', null)
    // console.log(stops)
    this.setState({ stops })
  }

  render() {
    // console.log(this.state.stops)
    return !this.state.stops ? (
      <Spinner />
    ) : (
      <TripRequest stops={this.state.stops} />
    )
  }
}

TripRequestScreen.navigationOptions = {
  title: 'Solicitud de viaje',
  headerBackTitle: '', // TODO: que no diga 'Back'
}
export default TripRequestScreen
