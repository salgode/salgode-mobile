import { actions as userActions } from '../actions/user'

export default function userReducer(state = {}, action) {
  // console.log(action)
  switch (action.type) {
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
      return { ...state, loading: false, ...action.payload.data.user }
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
        ...action.payload.data.user,
      }
    case userActions.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while updating user',
      }
    case userActions.USER_SIGNOUT:
      return { ...action.payload.user }
    case userActions.USER_UPLOAD_IMAGE:
      return { ...state, loading: true }
    case userActions.USER_UPLOAD_IMAGE_SUCCESS:
      return { ...state, loading: false, ...action.payload.data }
    case userActions.USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while uploading image',
      }
    default:
      return state
  }
}