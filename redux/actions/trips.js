import { getBaseHeaders } from '../../config/api/headers'

export const actions = {
  TRIPS_FETCH_FUTURE_TRIPS: 'TRIPS/FETCH',
  TRIPS_FETCH_FUTURE_TRIPS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  TRIPS_FETCH_FUTURE_TRIPS_FAIL: 'TRIP/FETCH_FAIL',
  TRIPS_FETCH_TRIP: 'TRIPS/FETCH_TRIP',
  TRIPS_FETCH_TRIP_SUCCESS: 'TRIPS/FETCH_TRIP_SUCCESS',
  TRIPS_FETCH_TRIP_FAIL: 'TRIP/FETCH_TRIP_FAIL',
  TRIPS_FETCH_DRIVER_TRIPS: 'TRIPS_FETCH_DRIVER', //TODO: add real endpoint
  TRIPS_FETCH_PAX_TRIPS: 'TRIPS_FETCH/PAX', //TODO: add real endpoint
  TRIPS_START_JOURNEY: 'TRIP_FETCH',
  TRIPS_FETCH_PASSENGERS: 'TRIP_PASSENGERS',
  TRIPS_GET_TRIP: 'TRIP_GET',
}

export function fetchFutureTripsByDriverId(authToken, driverId) {
  return {
    type: actions.TRIPS_FETCH_DRIVER_TRIPS,
    payload: {
      request: {
        url: `/drivers/${driverId}/trips`, // TODO: add real url
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function fetchFutureTripsByPaxId(authToken, paxId) {
  return {
    type: actions.TRIPS_FETCH_PAX_TRIPS,
    payload: {
      request: {
        url: `/paxs/${paxId}/trips`, // TODO: add real url
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
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
    type: actions.TRIPS_FETCH_FUTURE_TRIPS,
    payload: {
      request: {
        url: `/trips/${id}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}

export function fetchPassengers(authToken, tripId) {
  return {
    type: actions.TRIPS_FETCH_PASSENGERS,
    payload: {
      request: {
        url: `/trips/${tripId}/slots`,
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}

export function getTrip(authToken, tripId) {
  return {
    type: actions.TRIPS_GET_TRIP,
    payload: {
      request: {
        url: `/trips/${tripId}`,
        method: 'get',
        headers: getBaseHeaders(authToken),
      },
    },
  }
}
