import { actions as slotActions } from '../actions/slots'

export default function slotsReducer(state = {}, action) {
  switch (action.type) {
    case slotActions.SLOTS_CREATE:
      return { ...state, loading: true }
    case slotActions.SLOTS_CREATE_SUCCESS:
      return { ...state, loading: false }
    case slotActions.SLOTS_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching trips',
      }
    default:
      return state
  }
}
