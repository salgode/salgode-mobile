import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Spinner, View } from 'native-base'
import PropTypes from 'prop-types'
import TripRequest from '../components/Trips/TripRequest'
import { createSlot } from '../redux/actions/slots'
import { connect } from 'react-redux'

class TripRequestScreen extends Component {
  static navigationOptions = {
    title: 'Solicitud de viaje',
    headerBackTitle: '', // TODO: que no diga 'Back'
  }

  constructor(props) {
    super(props)
    this.state = {
      stops: null,
      tripId: null,
      loading: true,
    }

    this.onRequestSlot = this.onRequestSlot.bind(this)
  }

  componentDidMount() {
    const stops = this.props.navigation.getParam('stops', null)
    const tripId = this.props.navigation.getParam('tripId', null)
    console.log(stops)
    console.log(tripId)
    this.setState({ stops, tripId, loading: false })
  }

  async onRequestSlot(selectedStop) {
    const { user, createSlot } = this.props

    this.setState({ loading: true })
    const response = await createSlot(
      user.token,
      this.state.tripId,
      selectedStop.id,
      user.userId
    )
    this.setState({ loading: false })

    if (!response || response.error || response.errorMessage) {
      Alert.alert(
        'Error de reserva',
        'Hubo un error al reservar el puesto. Por favor inentelo de nuevo.'
      )
    } else {
      Alert.alert(
        'Solicitud enviada correctamente!',
        'Tu pedido está siendo revisado por el conductor.'
      )
      this.props.navigation.popToTop()
    }
  }

  render() {
    const { loading, stops } = this.state
    return (
      <View>
        {/* {loading && <Spinner style={styles.loading} />} */}
        <TripRequest
          loading={loading}
          stops={stops || []}
          onSend={this.onRequestSlot}
        />
      </View>
    )
  }
}

TripRequestScreen.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    popToTop: PropTypes.func.isRequired,
  }),
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  createSlot: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  createSlot: (token, tripId, stopId, userId) =>
    dispatch(createSlot(token, tripId, stopId, userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripRequestScreen)
