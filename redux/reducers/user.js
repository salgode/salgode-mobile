import { actions as userActions } from '../actions/user'
import { compareStrKeyAscending } from '../../utils/compare'

export default function userReducer(state = {}, action) {
  // console.log('Here: ', action.type, action.payload)
  switch (action.type) {
    case userActions.USER_SET:
      return { ...state, ...action.payload }
    case userActions.USER_LOGIN:
      return { ...state, loading: true }
    case userActions.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, ...action.payload.data }
    case userActions.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while login user',
      }
    case userActions.USER_SIGNUP:
      return { ...state, loading: true }
    case userActions.USER_SIGNUP_SUCCESS:
      return { ...state, loading: false, ...action.payload.data }
    case userActions.USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while signup user',
      }
    case userActions.USER_UPDATE:
      return { ...state, loading: true }
    case userActions.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.meta.previousAction.payload.extraData,
      }
    case userActions.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while updating user',
      }
    case userActions.USER_UPLOAD_IMAGE:
      return { ...state, loading: true }
    case userActions.USER_UPLOAD_IMAGE_SUCCESS:
      return { ...state, loading: false }
    case userActions.USER_GET_TRIPS:
      return { ...state, loading: true }
    case userActions.USER_GET_TRIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        trips: action.payload.data,
      }
    case userActions.USER_DRIVER_GET_TRIPS:
      return { ...state, loading: true }
    case userActions.USER_DRIVER_GET_TRIPS_SUCCESS:
      return {
        ...state,
        loading: false,
        driverTrips: action.payload.data.sort(
          compareStrKeyAscending('trip_status')
        ),
      }
    case userActions.USER_GET_CARS:
      return { ...state, loading: true }
    case userActions.USER_GET_CARS_SUCCESS:
      return { ...state, loading: false, cars: action.payload.data }
    case userActions.USER_GET_CAR:
      return { ...state, loading: true }
    case userActions.USER_GET_CAR_SUCCESS:
      return { ...state, loading: false, car: action.payload.data }
    case userActions.USER_CREATE_VEHICLE:
      return { ...state, loading: true }
    case userActions.USER_CREATE_VEHICLE_SUCCESS:
      return { ...state, loading: false }
    case userActions.USER_SET_TOKEN:
      return { ...state, token: action.payload.token }
    case userActions.USER_REMOVE_TRIP:
      return {
        ...state,
        trips: state.trips.filter(i => i.reservation_id !== action.payload.tripId),
      }
    default:
      return state
  }
}
