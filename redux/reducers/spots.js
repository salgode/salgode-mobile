import { actions as spotsActions } from '../actions/spots'

export default function spotsReducer(state = {}, action) {
  switch (action.type) {
    case spotsActions.RETRIEVE_ALL_SPOTS:
      return { ...state, loading: true }
    case spotsActions.RETRIEVE_ALL_SPOTS_SUCCESS:
      return { ...state, loading: false, spots: action.payload.data }
    case spotsActions.RETRIEVE_ALL_SPOTS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while retrieving spots',
      }
    default:
      return state
  }
}
