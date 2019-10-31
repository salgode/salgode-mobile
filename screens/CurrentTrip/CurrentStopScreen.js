import React, { Component } from 'react'
import { withNavigation } from 'react-navigation'
import CurrentStop from '../../components/CurrentTrip/CurrentStop'
import PropTypes from 'prop-types'

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
  }

  onPressCompleteTrip(trip) {
    const token = this.props.navigation.getParam('token', null)
    this.props.navigation.navigate('FinishTrip', { trip, token })
  }

  render() {
    return (
      <CurrentStop
        trip={this.state.trip}
        stopIndex={0}
        before={0} //todo revisar esto del before y el after, ahora esta todo malo
        after={1}
        onPressCompleteTrip={this.onPressCompleteTrip}
        asDriver={this.state.asDriver}
      />
    )
  }
}

CurrentStopScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}

export default withNavigation(CurrentStopScreen)
