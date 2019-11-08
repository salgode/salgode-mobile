import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import CurrentStop from '../../components/CurrentTrip/CurrentStop'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { nextJourneyPlace } from '../../redux/actions/trips'

class CurrentStopScreen extends Component {
  static navigationOptions = {
    title: 'En Curso',
  }
  constructor(props) {
    super(props)

    this.state = {
      trip: this.props.navigation.getParam('trip', null),
      asDriver: this.props.navigation.getParam('asDriver', false),
    }

    this.onPressCompleteTrip = this.onPressCompleteTrip.bind(this)
    this.onPressNextStop = this.onPressNextStop.bind(this)
  }

  onPressCompleteTrip(trip) {
    const token = this.props.navigation.getParam('token', null)
    this.props.navigation.navigate('FinishTrip', { trip, token })
  }
  onPressNextStop(trip) {
    const token = this.props.navigation.getParam('token', null)
    return this.props.onNextStop(token, trip)
  }

  render() {
    let nextStopIndex = this.state.trip.trip_route_points.findIndex(
      element => this.state.trip.trip_next_point.place_id === element.place_id
    )
    if (this.state.trip.current_point === this.state.trip.trip_route_points.length - 1) {
      nextStopIndex = this.state.trip.trip_route_points.length
    }

    return (
      <CurrentStop
        trip={this.state.trip}
        stopIndex={nextStopIndex}
        onPressCompleteTrip={this.onPressCompleteTrip}
        onPressNextStop={this.onPressNextStop}
        asDriver={this.state.asDriver}
      />
    )
  }
}

CurrentStopScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onNextStop: PropTypes.func.isRequired,
}

const mapPropsToState = () => ({})

const mapDispatchToState = dispatch => ({
  onNextStop: (token, id) => dispatch(nextJourneyPlace(token, id)),
})

export default connect(
  mapPropsToState,
  mapDispatchToState
)(withNavigation(CurrentStopScreen))
