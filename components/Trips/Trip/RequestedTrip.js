import React from 'react'
import { StyleSheet, Platform, Alert } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import Location from './Location'
import Colors from '../../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import TimeInfo from './TimeInfo'
import {
  Card,
  View,
  Text,
  CardItem,
  Button,
  Thumbnail,
  Spinner,
} from 'native-base'
import PropTypes from 'prop-types'
import { cancelSlot } from '../../../redux/actions/slots'

const RequestedTrip = ({
  timestamp,
  user,
  reservationStatus,
  startLocation,
  trip,
  removeFromList,
  dispatchCancelSlot,
  token,
  navigation,
  tripStatus,
}) => {
  const [loadingCancel, setLoadingCancel] = React.useState(false)
  let statusColor
  let statusText
  let show = true
  const showDetailsButton = true
  let showCancelButton = true
  let showInProgress = false
  switch (reservationStatus) {
    case 'completed':
      show = false
      break
    case 'accepted':
      statusColor = 'green'
      statusText = 'Aceptado'
      showCancelButton = false
      if (trip && trip.trip_status === 'in_progress') {
        showInProgress = true
      }
      break
    case 'pending':
      statusColor = 'purple'
      statusText = 'Pendiente'
      break
    case 'declined':
      statusColor = 'red'
      statusText = 'Rechazado'
      showCancelButton = false
      break
    case 'cancelled':
      show = false
      break
    default:
      show = false
  }
  if (trip.trip_status === 'completed') {
    return null
  }

  let tripStatusColor
  let tripStatusText

  if (tripStatus === 'open') {
    tripStatusColor = 'green'
    tripStatusText = 'Por iniciar'
  } else if (tripStatus === 'in_progress') {
    tripStatusColor = 'purple'
    tripStatusText = 'En curso'
  } else {
    tripStatusColor = 'blue'
    tripStatusText = 'Completado'
  }
  const onCancel = () => {
    setLoadingCancel(true)
    dispatchCancelSlot(token, trip.reservation_id)
      .then(() => {
        Alert.alert(
          'Reserva cancelada',
          'Su reserva ha sido cancelada con éxito'
        )
        // setLoadingCancel(false)
        removeFromList(trip.reservation_id)
      })
      .catch(() => {
        Alert.alert(
          'Error al cancelar',
          'No se pudo cancelar con éxito su reservar. Por favor inténtelo de nuevo'
        )
        setLoadingCancel(false)
      })
  }

  const pressTrip = () => {
    if (user && user.driver_verifications && trip) {
      const {
        driver_avatar,
        driver_name,
        driver_phone,
        driver_verifications,
      } = user
      navigation.navigate('ReservationDetails', {
        userData: {
          avatar: driver_avatar,
          first_name: driver_name,
          phone: driver_phone,
          dniVerified: driver_verifications.identity,
          licenseVerified: driver_verifications.driver_license,
          trip_route_points: trip.trip_route_points,
          etd_info: trip.etd_info,
          isReserved: ['accepted', 'completed'].includes(
            trip.reservation_status
          ),
        },
        vehicle: trip.vehicle,
      })
    }
  }

  return show ? (
    <Card style={styles.containerRequested} borderWidth={5}>
      <View style={styles.statusContainer}>
        <View style={{ ...styles.status, backgroundColor: statusColor }}>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
        <View
          style={{ ...styles.statusRight, backgroundColor: tripStatusColor }}
        >
          <Text style={styles.tripStatusText}>{tripStatusText}</Text>
        </View>
      </View>

      <CardItem>
        <View style={styles.user}>
          <View style={styles.userData}>
            {user.driver_avatar ? (
              <Thumbnail source={{ uri: user.driver_avatar }} />
            ) : (
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
                size={40}
              />
            )}
            <Text style={styles.userText}>{user.driver_name}</Text>
          </View>
        </View>
      </CardItem>
      <CardItem style={styles.locationContainer}>
        <Text>#Parte en</Text>
        <Location color={'#0000FF'} location={startLocation.place_name} />
      </CardItem>
      {trip && trip.reservation_route && (
        <CardItem style={styles.locationContainer}>
          <Text>#Subo en</Text>
          <Location
            color="gray"
            location={trip.reservation_route.start.place_name}
          />
        </CardItem>
      )}
      <CardItem>
        <TimeInfo timestamp={timestamp} />
      </CardItem>
      <CardItem style={styles.containerBottom}>
        {showDetailsButton && (
          <Button borderRadius={10} style={styles.button} onPress={pressTrip}>
            <Text style={styles.blueText}>Ver Viaje</Text>
          </Button>
        )}
        {showCancelButton && (
          <>
            {loadingCancel ? (
              <View style={styles.spinner}>
                <Spinner color="blue" />
              </View>
            ) : (
              <Button
                borderRadius={10}
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </Button>
            )}
          </>
        )}
      </CardItem>
    </Card>
  ) : (
    <></>
  )
}

RequestedTrip.propTypes = {
  timestamp: PropTypes.string.isRequired,
  user: PropTypes.shape({
    driver_name: PropTypes.string.isRequired,
    driver_avatar: PropTypes.string.isRequired,
    driver_phone: PropTypes.string.isRequired,
    driver_verifications: PropTypes.object,
  }).isRequired,
  reservationStatus: PropTypes.oneOf([
    'accepted',
    'pending',
    'declined',
    'cancelled',
    'completed',
  ]),
  startLocation: PropTypes.object.isRequired,
  endLocation: PropTypes.object.isRequired,
  onSend: PropTypes.func.isRequired,
  removeFromList: PropTypes.func.isRequired,
  dispatchCancelSlot: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  tripStatus: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  blueText: {
    color: '#0000FF',
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#0000FF',
    borderWidth: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: 'white',
    borderColor: '#FF5242',
    borderWidth: 1,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  cancelText: {
    color: '#FF5242',
  },
  containerBottom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  containerRequested: {
    alignItems: 'flex-start',
    // borderColor: Colors.lightBackground,
    borderRadius: 20,
    // borderWidth: 10,
    padding: 15,
    shadowColor: '#b3b3b3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  labels: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  locationContainer: {
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  spinner: { flex: 1 },
  status: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  statusRight: {
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    position: 'absolute',
    right: 0,
  },
  statusText: { color: 'white', fontSize: 12, fontWeight: '700' },
  tripStatusText: {
    // alignSelf: 'flex-end',
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  userData: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userText: {
    color: Colors.textGray,
    fontSize: 16,
    fontWeight: '800',
    marginLeft: 15,
  },
})

const mapStateToProps = state => ({
  token: state.user.token,
})

const mapDispatchToProps = dispatch => ({
  dispatchCancelSlot: (token, resId) => dispatch(cancelSlot(token, resId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(RequestedTrip))
