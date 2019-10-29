import { urls, getBaseHeaders } from '../config/api'

const baseUrl = 'https://7wsx5vxfbi.execute-api.us-east-1.amazonaws.com/staging'
// const baseUrl = 'https://playground-api.salgode.com'

export const getTripInfo = async (tripId, token) => {
  const response = await fetch(`${baseUrl}/trips/${tripId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(resp => resp.json())
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err)
      return null
    })
  return response
}

export const getUserInfo = async (userId, token) => {
  const response = await fetch(`${baseUrl}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(resp => resp.json())
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err)
      return null
    })
  return response
}

export const mapTripIdsToTripInfo = async (trips, token) => {
  return Promise.all(
    trips.map(trip => {
      return getTripInfo(trip.trip_id, token)
    })
  )
}

export const getTripReservations = async (token, tripId) => {
  const response = await fetch(
    `${baseUrl}${urls.driver.reservations.get.all(tripId)}`,
    {
      method: 'GET',
      headers: getBaseHeaders(token),
    }
  )
    .then(resp => resp.json())
    .catch(err => {
      // eslint-disable-next-line no-console
      console.log(err)
      return null
    })
  return response
}
