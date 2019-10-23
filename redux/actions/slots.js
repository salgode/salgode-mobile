export const actions = {
  SLOTS_CREATE: 'SLOTS/CREATE',
  SLOTS_CREATE_SUCCESS: 'SLOTS/CREATE_SUCCESS',
  SLOTS_CREATE_FAIL: 'SLOTS/CREATE_FAIL',
}

export function createSlot(authToken, tripId, startId, stopId) {
  return {
    type: actions.SLOTS_CREATE,
    payload: {
      request: {
        url: `/user/reservations`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
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
