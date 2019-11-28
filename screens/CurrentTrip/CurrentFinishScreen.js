import React, { Component } from 'react'
import {
  withNavigation,
  StackActions,
  NavigationActions,
} from 'react-navigation'
import FinishedTrip from '../../components/CurrentTrip/FinishedTrip'
import { connect } from 'react-redux'
import { finishTrip } from '../../redux/actions/trips'
import { analytics, ANALYTICS_CATEGORIES } from '../../utils/analytics'
import PropTypes from 'prop-types'

class CurrentFinishScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.onPressFinishTrip = this.onPressFinishTrip.bind(this)
  }

  async onPressFinishTrip() {
    this.setState({ loading: true })
    const trip = this.props.navigation.getParam('trip', null)
    const token = this.props.navigation.getParam('token', null)

    const resp = await this.props.finishTrip(token, trip.trip_id)
    // console.log(resp)

    analytics.newEvent(
      ANALYTICS_CATEGORIES.AsDriver.name,
      ANALYTICS_CATEGORIES.AsDriver.actions.End,
      this.props.user.userId
    )

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Trips' })],
    })
    this.props.navigation.dispatch(resetAction)
    this.setState({ loading: false })
  }

  render() {
    const trip = this.props.navigation.getParam('trip', null)
    const location = trip.trip_route.end.place_name
    const tripId = trip.trip_id
    const token = this.props.navigation.getParam('token', null)
    return (
      <FinishedTrip
        location={location}
        token={token}
        tripId={tripId}
        onPress={this.onPressFinishTrip}
        loading={this.state.loading}
      />
    )
  }
}

CurrentFinishScreen.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.any.isRequired,
  }).isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  finishTrip: (token, id) => dispatch(finishTrip(token, id)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(CurrentFinishScreen))
