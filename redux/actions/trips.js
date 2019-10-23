export const actions = {
  TRIPS_FETCH_FUTURE_TRIPS: 'TRIPS/FETCH',
  TRIPS_FETCH_FUTURE_TRIPS_SUCCESS: 'TRIPS/FETCH_SUCCESS',
  TRIPS_FETCH_FUTURE_TRIPS_FAIL: 'TRIP/FETCH_FAIL',
  TRIPS_FETCH_TRIP: 'TRIPS/FETCH_TRIP',
  TRIPS_FETCH_TRIP_SUCCESS: 'TRIPS/FETCH_TRIP_SUCCESS',
  TRIPS_FETCH_TRIP_FAIL: 'TRIP/FETCH_TRIP_FAIL',
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
