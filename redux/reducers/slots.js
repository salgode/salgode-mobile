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
    case slotActions.SLOTS_CANCEL:
      return { ...state, loading: true }
    case slotActions.SLOTS_CANCEL_SUCCESS:
      return { ...state, loading: false }
    case slotActions.SLOTS_CANCEL_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while cancelling reservation',
      }
    default:
      return state
  }
}
