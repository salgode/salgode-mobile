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

export function createTrip(route_points, etd) {
  // missing car_i and driver_id. Checkoput backend repo to work with
  return {
    type: actions.CREATE_TRIP,
    payload: {
      request: {
        url: `/trips`,
        method: 'post',
        data: {
          route_points,
          etd,
        },
      },
    },
  }
}
