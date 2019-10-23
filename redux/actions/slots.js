export const actions = {
  SLOTS_CREATE: 'SLOTS/CREATE',
  SLOTS_CREATE_SUCCESS: 'SLOTS/CREATE_SUCCESS',
  SLOTS_CREATE_FAIL: 'SLOTS/CREATE_FAIL',
}

export function createSlot(authToken, tripId, spotId, userId) {
  return {
    type: actions.SLOTS_CREATE,
    payload: {
      request: {
        url: `/trips/${tripId}/slots`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          trip_id: tripId,
          spot_id: spotId,
          user_id: userId,
        },
      },
    },
  }
}
