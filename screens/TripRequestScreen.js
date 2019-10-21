import React, { Component } from 'react'
import { Spinner } from 'native-base'
import PropTypes from 'prop-types'
import TripRequest from '../components/Trips/TripRequest'
import { createSlot } from '../redux/actions/slots'
import { connect } from 'react-redux'

class TripRequestScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      stops: null,
      tripId: null,
    }

    this.onRequestSlot = this.onRequestSlot.bind(this)
  }

  componentDidMount() {
    const stops = this.props.navigation.getParam('stops', null)
    const tripId = this.props.navigation.getParam('tripId', null)
    this.setState({ stops, tripId })
  }

  async onRequestSlot() {
    const { user, createSlot } = this.props
    console.log(user)
    const response = await createSlot(
      user.token,
      this.state.tripId,
      user.userId
    )
    console.log(response)
    if (!response || response.error) {
      alert('Hubo un error al reservar el puesto. Por favor inentelo de nuevo.')
    } else {
      alert('Puesto reservado correctamente!')
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    return !this.state.stops ? (
      <Spinner />
    ) : (
      <TripRequest stops={this.state.stops} onSend={this.onRequestSlot} />
    )
  }
}

TripRequestScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigation: PropTypes.func.isRequired,
  }),
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  createSlot: (token, tripId, userId) =>
    dispatch(createSlot(token, tripId, userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripRequestScreen)

TripRequestScreen.navigationOptions = {
  title: 'Solicitud de viaje',
  headerBackTitle: '', // TODO: que no diga 'Back'
}
