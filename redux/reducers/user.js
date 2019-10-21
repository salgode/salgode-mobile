import { actions as userActions } from '../actions/user'

export default function userReducer(state = {}, action) {
  console.log('before', action)
  switch (action.type) {
    case userActions.USER_LOGIN:
      return { ...state, loading: true }
    case userActions.USER_LOGIN_SUCCESS:
      console.log('after', action)
      return { ...state, loading: false, user: action.payload.data }
    case userActions.USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while login user',
      }
    case userActions.USER_SIGNUP:
      return { ...state, loading: true }
    case userActions.USER_SIGNUP_SUCCESS:
      return { ...state, loading: false, user: action.payload.data.user }
    case userActions.USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while signup user',
      }
    default:
      return state
  }
}
