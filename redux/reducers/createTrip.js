import { actions as createTripActions } from '../actions/createtrip'

export default function createTripReducer(state = {}, action) {
  switch (action.type) {
    case createTripActions.SET_START_STOP:
      return { ...state, startStop: action.payload }
    case createTripActions.SET_END_STOP:
      return { ...state, endStop: action.payload }
    case createTripActions.CLEAR_START_STOP:
      return { ...state, startStop: '' }
    case createTripActions.CLEAR_END_STOP:
      return { ...state, endStop: '' }
    case createTripActions.SET_START_TIME:
      return { ...state, startTime: action.payload }
    case createTripActions.CLEAR_CREATE_TRIP_INFO:
      return {
        startStop: '',
        endStop: '',
        startTime: '',
      }
    case createTripActions.CREATE_TRIP:
      return { ...state, loading: true }
    case createTripActions.CREATE_TRIP_SUCCESS:
      return { ...state, loading: false }
    case createTripActions.RETRIEVE_ALL_SPOTS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while retrieving spots',
      }
    default:
      return state
  }
}
