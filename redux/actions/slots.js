import { getBaseHeaders } from '../../config/api/headers'
import { urls } from '../../config/api'

export const actions = {
  SLOTS_CREATE: 'SLOTS_CREATE',
  SLOTS_CREATE_SUCCESS: 'SLOTS_CREATE_SUCCESS',
  SLOTS_CREATE_FAIL: 'SLOTS_CREATE_FAIL',
  SLOTS_CANCEL: 'SLOTS_CANCEL',
  SLOTS_CANCEL_SUCCESS: 'SLOTS_CANCEL_SUCCESS',
  SLOTS_CANCEL_FAIL: 'SLOTS_CANCEL_FAIL',
}

export function createSlot(authToken, tripId, startId, stopId) {
  return {
    type: actions.SLOTS_CREATE,
    payload: {
      request: {
        url: urls.passenger.reservations.post.send(),
        method: 'post',
        headers: getBaseHeaders(authToken),
        data: {
          trip_id: tripId,
          reserved_seats: 1,
          route: {
            start: startId,
            end: stopId,
          },
        },
      },
    },
  }
}

export function cancelSlot(authToken, resId) {
  return {
    type: actions.SLOTS_CANCEL,
    payload: {
      request: {
        url: urls.passenger.reservations.post.cancel(resId),
        method: 'post',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}
