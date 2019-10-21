export const actions = {
  SET_START_STOP: 'SET_START_STOP',
  SET_END_STOP: 'SET_END_STOP',
  SET_STOPS: 'SET_STOPS',
  CLEAR_CREATE_TRIP_INFO: 'CLEAR_CREATE_TRIP_INFO',
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

export function setStops(stops) {
  return {
    type: actions.SET_STOPS,
    payload: stops,
  }
}

export function clearCreateTripInfo() {
  return { type: actions.CLEAR_CREATE_TRIP_INFO }
}