import { getBaseHeaders } from '../../config/api/headers'
import { urls } from '../../config/api'

export const actions = {
  TRIPS_FETCH_FUTURE_TRIPS: 'TRIPS/FETCH',
  TRIPS_FETCH_FUTURE_TRIPS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  TRIPS_FETCH_FUTURE_TRIPS_FAIL: 'TRIP/FETCH_FAIL',
  TRIPS_FETCH_TRIP: 'TRIPS/FETCH_TRIP',
  TRIPS_FETCH_TRIP_SUCCESS: 'TRIPS/FETCH_TRIP_SUCCESS',
  TRIPS_FETCH_TRIP_FAIL: 'TRIP/FETCH_TRIP_FAIL',
  SET_SEARCH_START_PLACE: 'SET_SEARCH_START_PLACE',
  CLEAN_SEARCH_START_PLACE: 'CLEAN_SEARCH_START_PLACE',
  SET_SEARCH_END_PLACE: 'SET_SEARCH_END_PLACE',
  CLEAN_SEARCH_END_PLACE: 'CLEAN_SEARCH_END_PLACE',
}

export function cleanSearchStartPlace() {
  return {
    type: actions.CLEAN_SEARCH_START_PLACE,
  }
}

export function setSearchStartPlace(startPlace, authToken) {
  return {
    type: actions.SET_SEARCH_START_PLACE,
    payload: {
      startPlace,
      request: {
        url: `/trips/open`,
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function cleanSearchEndPlace() {
  return {
    type: actions.CLEAN_SEARCH_END_PLACE,
  }
}

export function setSearchEndPlace(endPlace) {
  return {
    type: actions.SET_SEARCH_END_PLACE,
    payload: endPlace,
  }
}

export function fetchFutureTrips(authToken) {
  return {
    type: actions.TRIPS_FETCH_FUTURE_TRIPS,
    payload: {
      request: {
        url: `/trips/open`,
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function startJourney(authToken, tripId, users) {
  return {
    type: actions.TRIPS_START_JOURNEY,
    payload: {
      request: {
        url: `/trips/${tripId}/start`,
        method: 'post',
        headers: getBaseHeaders(authToken),
        body: {
          users: users,
        },
      },
    },
  }
}

export function fetchTrip(authToken, id) {
  return {
    type: actions.TRIPS_FETCH_TRIP,
    payload: {
      request: {
        url: urls.driver.trips.get.single(id),
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
