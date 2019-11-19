import { getBaseHeaders, urls } from '../../config/api'

export const actions = {
  PASSENGER_GET_RESERVATION: 'PASSENGER_GET_RESERVATION',
  PASSENGER_GET_RESERVATION_SUCCESS: 'PASSENGER_GET_RESERVATION_SUCCESS',
  PASSENGER_GET_RESERVATION_FAIL: 'PASSENGER_GET_RESERVATION_FAIL',
}

export function getReservation(token, reservation_id) {
  return {
    type: actions.PASSENGER_GET_RESERVATION,
    payload: {
      request: {
        url: urls.passenger.reservations.get.single(reservation_id),
        method: 'get',
        headers: getBaseHeaders(token),
      },
    },
  }
}
