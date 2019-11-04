import { getBaseHeaders } from '../../config/api/headers'
import { urls } from '../../config/api'

export const actions = {
  TRIPS_FETCH_FUTURE_TRIPS: 'TRIPS/FETCH',
  TRIPS_FETCH_FUTURE_TRIPS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  TRIPS_FETCH_FUTURE_TRIPS_FAIL: 'TRIP/FETCH_FAIL',

  TRIPS_FETCH_TRIP: 'TRIPS/FETCH_TRIP',
  TRIPS_FETCH_TRIP_SUCCESS: 'TRIPS/FETCH_TRIP_SUCCESS',
  TRIPS_FETCH_TRIP_FAIL: 'TRIP/FETCH_TRIP_FAIL',

  TRIPS_START_JOURNEY: 'TRIPS/TRIPS_START_JOURNEY',
  TRIPS_START_JOURNEY_SUCCESS: 'TRIPS/TRIPS_START_JOURNEY_SUCCESS',
  TRIPS_START_JOURNEY_FAIL: 'TRIP/TRIPS_START_JOURNEY_FAIL',

  TRIPS_NEXT_JOURNEY: 'TRIPS/TRIPS_NEXT_JOURNEY',
  TRIPS_NEXT_JOURNEY_SUCCESS: 'TRIPS/TRIPS_NEXT_JOURNEY_SUCCESS',
  TRIPS_NEXT_JOURNEY_FAIL: 'TRIP/TRIPS_NEXT_JOURNEY_FAIL',

  TRIPS_FETCH_TRIP_MANIFEST: 'TRIPS/FETCH_TRIP_MANIFEST',
  TRIPS_FETCH_TRIP_MANIFEST_SUCCESS: 'TRIPS/FETCH_TRIP_MANIFEST_SUCCESS',
  TRIPS_FETCH_TRIP_MANIFEST_FAIL: 'TRIP/FETCH_TRIP_MANIFEST_FAIL',

  SET_SEARCH_START_PLACE: 'SET_SEARCH_START_PLACE',
  CLEAN_SEARCH_START_PLACE: 'CLEAN_SEARCH_START_PLACE',
  SET_SEARCH_START_PLACE_FAIL: 'SET_SEARCH_START_PLACE_FAIL',
  SET_SEARCH_START_PLACE_SUCCESS: 'SET_SEARCH_START_PLACE_SUCCESS',

  SET_SEARCH_END_PLACE: 'SET_SEARCH_END_PLACE',
  CLEAN_SEARCH_END_PLACE: 'CLEAN_SEARCH_END_PLACE',

  TRIPS_GET_RESERVATIONS: 'TRIPS_GET_RESERVATIONS',
  TRIPS_GET_RESERVATIONS_SUCCESS: 'TRIPS_GET_RESERVATIONS_SUCCESS',
  TRIPS_GET_RESERVATIONS_FAIL: 'TRIPS_GET_RESERVATIONS_FAIL',
}

export function cleanSearchStartPlace() {
  return {
    type: actions.CLEAN_SEARCH_START_PLACE,
  }
}

export function setSearchStartPlace(startPlace, authToken) {
  if (startPlace) {
    return {
      type: actions.SET_SEARCH_START_PLACE,
      payload: {
        startPlace,
        request: {
          url: `/trips/search/intersects/${startPlace.place_id}`,
          method: 'get',
          headers: getBaseHeaders(authToken),
        },
      },
    }
  }
  return {
    type: actions.SET_SEARCH_START_PLACE,
    payload: { startPlace },
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

export function startJourney(authToken, trip_id) {
  return {
    type: actions.TRIPS_START_JOURNEY,
    payload: {
      request: {
        url: urls.driver.trips.post.start(trip_id),
        method: 'post',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function nextJourneyPlace(authToken, trip_id) {
  return {
    type: actions.TRIPS_START_JOURNEY,
    payload: {
      request: {
        url: urls.driver.trips.post.next(trip_id),
        method: 'post',
        headers: getBaseHeaders(authToken),
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
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function fetchTripManifest(authToken, id) {
  return {
    type: actions.TRIPS_FETCH_TRIP_MANIFEST,
    payload: {
      request: {
        url: urls.driver.trips.get.manifest(id),
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function getTripReservations(authToken, id) {
  return {
    type: actions.TRIPS_GET_RESERVATIONS,
    payload: {
      request: {
        url: urls.driver.reservations.get.all(id),
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}
