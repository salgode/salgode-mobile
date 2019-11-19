import { getReservation } from '../../redux/actions/passenger'
import { store } from '../../redux/store'

export const declineReservation = async navigation => {
  navigation.navigate('Pedidos')
}

export const requestTrip = async (navigation, trip_id) => {
  navigation.navigate('DetailedTrip', {
    asDriver: true,
    trip_id,
  })
}

export const acceptReservation = async (
  navigation,
  reservation_id,
  userToken
) => {
  const response = await store.dispatch(
    getReservation(userToken, reservation_id)
  )
  if (!response || response.error) return
  const reservation = response.payload.data
  const { driver, vehicle } = reservation
  navigation.navigate('ReservationDetails', {
    userData: {
      avatar: driver.driver_avatar,
      first_name: driver.driver_name,
      phone: driver.driver_phone,
      dniVerified: driver.driver_verifications.identity,
      licenseVerified: driver.driver_verifications.driver_license,
      trip_route_points: reservation.trip_route_points,
      etd_info: reservation.etd_info,
      isReserved: ['accepted', 'completed'].includes(
        reservation.reservation_status
      ),
    },
    vehicle,
  })
}
