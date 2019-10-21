import { actions as tripActions } from '../actions/trips'

export default function futureTripsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.TRIPS_FETCH_FUTURE_TRIPS:
      return { ...state, loading: true }
    case tripActions.TRIPS_FETCH_FUTURE_TRIPS_SUCCESS:
      return { ...state, loading: false, futureTrips: action.payload.data }
    case tripActions.TRIPS_FETCH_FUTURE_TRIPS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips',
      }
    default:
      return state
  }
}
