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
    case tripActions.TRIPS_GET_RESERVATIONS:
      return { ...state, loading: true }
    case tripActions.TRIPS_GET_RESERVATIONS_SUCCESS:
      return { ...state, loading: false }
    case tripActions.TRIPS_GET_RESERVATIONS_FAIL:
      return { ...state, loading: false }
    case tripActions.TRIPS_NEXT_JOURNEY_SUCCESS:
      return {
        ...state,
        loading: false,
        trip: {
          ...state.trip,
          trip_next_point: {
            place_id:
              action.payload.data.next_point === null
                ? state.trip.trip_route_points.lenght - 1
                : action.payload.data.next_point,
          },
        },
      }
    case tripActions.TRIPS_ACCEPT_RESERVATION:
      return { ...state, loading: true }
    case tripActions.TRIPS_ACCEPT_RESERVATION_SUCCESS:
      return { ...state, loading: false }
    case tripActions.TRIPS_ACCEPT_RESERVATION_FAIL:
      return { ...state, loading: false }
    case tripActions.TRIPS_DECLINE_RESERVATION:
      return { ...state, loading: true }
    case tripActions.TRIPS_DECLINE_RESERVATION_SUCCESS:
      return { ...state, loading: false }
    case tripActions.TRIPS_DECLINE_RESERVATION_FAIL:
      return { ...state, loading: false }
    case tripActions.TRIPS_REMOVE_TRIP_FROM_LIST:
      return {
        ...state,
        requestedTrips: state.requestedTrips.filter(
          i => i.trip_id !== action.payload.trip_id
        ),
      }
    case tripActions.TRIPS_OPEN_SUCCESS:
      return {
        ...state,
        requestedTrips: action.payload.data,
      }
    default:
      return state
  }
}
