export const actions = {
  TRIPS_FETCH_FUTURE_TRIPS: 'TRIPS/FETCH',
  TRIPS_FETCH_FUTURE_TRIPS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  TRIPS_FETCH_FUTURE_TRIPS_FAIL: 'TRIP/FETCH_FAIL',
  TRIPS_FETCH_DRIVER_TRIPS: 'TRIPS/FETCH/DRIVER', //TODO: add real endpoint
  TRIPS_FETCH_PAX_TRIPS: 'TRIPS/FETCH/PAX', //TODO: add real endpoint
  TRIPS_FETCH_TRIP: 'TRIP/FETCH',
  TRIPS_START_JOURNEY: 'TRIP/FETCH',
  TRIPS_FETCH_PASSENGERS: 'TRIP/PASSENGERS',
  TRIPS_GET_TRIP: 'TRIP/GET',
}

export function fetchFutureTripsByDriverId(authToken, driverId) {
  return {
    type: actions.TRIPS_FETCH_DRIVER_TRIPS,
    payload: {
      request: {
        url: `/drivers/${driverId}/trips`, // TODO: add real url
        method: 'get',
        headers: {
          Authorization: authToken,
        },
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
        headers: {
          Authorization: authToken,
        },
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
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
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
        headers: {
          Authorization: authToken,
        },
        body: {
          users: users,
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
        headers: {
          Authorization: authToken,
        },
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
        headers: {
          Authorization: authToken,
        },
      },
    },
  }
}
