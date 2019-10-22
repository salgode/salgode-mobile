import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
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
    this.setState({ stops, tripId, loading: false })
  }

  async onRequestSlot() {
    const { user, createSlot } = this.props
    // console.log(user)

    this.setState({ loading: true })
    const response = await createSlot(
      user.token,
      this.state.tripId,
      user.userId
    )
    this.setState({ loading: false })

    if (!response || response.error) {
      alert('Hubo un error al reservar el puesto. Por favor inentelo de nuevo.')
    } else {
      alert('Puesto reservado correctamente!')
      this.props.navigation.popToTop()
    }
  }

  render() {
    return (
      <View>
        {this.state.loading && <Spinner style={styles.loading} />}
        <TripRequest
          stops={this.state.stops || []}
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

const styles = StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFillObject,
  },
})

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
