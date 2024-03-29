import { getDefaultHeaders, getBaseHeaders, urls } from '../../config/api'

export const actions = {
  SET_START_STOP: 'SET_START_STOP',
  SET_END_STOP: 'SET_END_STOP',
  SET_START_TIME: 'SET_START_TIME',
  CLEAR_CREATE_TRIP_INFO: 'CLEAR_CREATE_TRIP_INFO',
  CLEAR_START_STOP: 'CLEAR_START_STOP',
  CLEAR_END_STOP: 'CLEAR_END_STOP',
  CREATE_TRIP: 'CREATE_TRIP',
  CREATE_TRIP_SUCCESS: 'CREATE_TRIP_SUCCESS',
  CREATE_TRIP_FAIL: 'CREATE_TRIP_FAIL',
}

export function setStartStop(startStop) {
  return {
    type: actions.SET_START_STOP,
    payload: startStop,
  }
}

export function setEndStop(endStop) {
  return {
    type: actions.SET_END_STOP,
    payload: endStop,
  }
}

export function clearStartStop() {
  return {
    type: actions.CLEAR_START_STOP,
  }
}

export function clearEndStop() {
  return {
    type: actions.CLEAR_END_STOP,
  }
}

export function setStartTime(time) {
  return {
    type: actions.SET_START_TIME,
    payload: time,
  }
}

export function clearCreateTripInfo() {
  return { type: actions.CLEAR_CREATE_TRIP_INFO }
}

export function createTrip(route_points, etd, vehicleId, token) {
  return {
    type: actions.CREATE_TRIP,
    payload: {
      request: {
        url: urls.driver.trips.post.trip(),
        method: 'post',
        headers: getBaseHeaders(token),
        data: {
          available_seats: 4,
          etd_info: {
            etd,
            etd_policy: 'strict',
            max_wait: 5,
          },
          route_points,
          vehicle_id: vehicleId,
        },
      },
    },
  }
}
