import { actions as tripActions } from '../actions/trips'

export default function tripsReducer(state = {}, action) {
  switch (action.type) {
    case tripActions.CLEAN_SEARCH_START_PLACE:
      return { ...state, startPlace: {} }

    case tripActions.SET_SEARCH_START_PLACE:
      return {
        ...state,
        loading: true,
        startPlace: action.payload.startPlace,
      }
    case tripActions.SET_SEARCH_START_PLACE_SUCCESS:
      return {
        ...state,
        loading: false,
        requestedTrips: action.payload.data,
      }
    case tripActions.SET_SEARCH_START_PLACE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching requested trips',
      }
    case tripActions.CLEAN_SEARCH_END_PLACE:
      return { ...state, endPlace: {} }
    case tripActions.SET_SEARCH_END_PLACE:
      return { ...state, endPlace: action.payload }
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
      return {
        ...state,
        loading: false,
        trip: action.payload.data,
      }
    case tripActions.TRIPS_FETCH_TRIP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trip',
      }
    case tripActions.TRIPS_FETCH_TRIP_MANIFEST:
      return { ...state, loading: true }
    case tripActions.TRIPS_FETCH_TRIP_MANIFEST_SUCCESS:
      return {
        ...state,
        loading: false,
        trip: {
          ...state.trip,
          manifest: action.payload.data,
        },
      }
    case tripActions.TRIPS_FETCH_TRIP_MANIFEST_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trip',
      }
    default:
      return state
  }
}
