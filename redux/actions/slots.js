export const actions = {
  SLOTS_CREATE: 'SLOTS/CREATE',
  SLOTS_CREATE_SUCCESS: 'SLOTS/CREATE_SUCCESS',
  SLOTS_CREATE_FAIL: 'SLOTS/CREATE_FAIL',
}

export function createSlot(authToken, tripId, userId) {
  return {
    type: actions.SLOTS_CREATE,
    payload: {
      request: {
        url: `/trips/${tripId}/slots`,
        method: 'post',
        headers: {
          Authorization: authToken,
        },
        body: {
          trip_id: tripId,
          user_id: userId,
        },
      },
    },
  }
}
