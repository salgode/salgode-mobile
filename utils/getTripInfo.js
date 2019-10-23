export const getTripInfo = async (tripId, token) => {
  const response = await fetch(
    `https://7wsx5vxfbi.execute-api.us-east-1.amazonaws.com/staging/trips/${tripId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export const getUserInfo = async (userId, token) => {
  const response = await fetch(
    `https://7wsx5vxfbi.execute-api.us-east-1.amazonaws.com/staging/users/${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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

export const mapTripIdsToTripInfo = async (trips, token) => {
  return Promise.all(
    trips.map(trip => {
      return getTripInfo(trip.trip_id, token)
    })
  )
}
