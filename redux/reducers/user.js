import { actions as userActions } from '../actions/user'

export default function userReducer(state = {}, action) {
<<<<<<< HEAD
=======
  console.log('before', action)
>>>>>>> 897f30b5d37ff51ad9cbc4ad89bf6203081c183d
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
      return { ...state, loading: false, user: action.payload.data }
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
