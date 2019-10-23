import { getBaseHeaders } from '../../config/api/headers'

export const actions = {
  RETRIEVE_ALL_SPOTS: 'RETRIEVE_ALL_SPOTS',
  RETRIEVE_ALL_SPOTS_SUCCESS: 'RETRIEVE_ALL_SPOTS_SUCCESS',
  RETRIEVE_ALL_SPOTS_FAIL: 'RETRIEVE_ALL_SPOTS_FAIL',
}

export function getAllSpots(token) {
  return {
    type: actions.RETRIEVE_ALL_SPOTS,
    payload: {
      request: {
        url: `/spots`,
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}
