import { getBaseHeaders } from '../../config/api/headers'
import { urls } from '../../config/api'

export const actions = {
  SLOTS_CREATE: 'SLOTS_CREATE',
  SLOTS_CREATE_SUCCESS: 'SLOTS_CREATE_SUCCESS',
  SLOTS_CREATE_FAIL: 'SLOTS_CREATE_FAIL',
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
