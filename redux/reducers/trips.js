import { actions as tripActions } from '../actions/trips'

export default function tripsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.TRIPS_FETCH_FUTURE_TRIPS:
      return { ...state, loading: true }
    case tripActions.TRIPS_FETCH_FUTURE_TRIPS_SUCCESS:
      return { ...state, loading: false, open: action.payload.data }
    case tripActions.TRIPS_FETCH_FUTURE_TRIPS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips',
      }
    case tripActions.TRIPS_FETCH_TRIP:
      return { ...state, loading: true }
    case tripActions.TRIPS_FETCH_TRIP_SUCCESS:
      return { ...state, loading: false, trip: action.payload.data }
    case tripActions.TRIPS_FETCH_TRIP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trip',
      }
    default:
      return state
  }
}
