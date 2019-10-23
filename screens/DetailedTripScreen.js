import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import DetailedTrip from '../components/Trips/Trip/DetailedTrip'
import { Spinner } from 'native-base'
import TripRequestCard from '../components/Trips/Trip/TripRequestCard'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { withNavigation } from 'react-navigation'
import { client } from '../redux/store'

class DetailedTripScreen extends Component {
  static navigationOptions = {
    title: 'Mis Viajes',
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      trip: null,
      asDriver: false,
      tripId: '',
      token: 'Bearer 12345',
      driver: null,
      slots: [],
    }

    this.getTrip = this.getTrip.bind(this)
    this.fetchTrip = this.fetchTrip.bind(this)
    this.fetchPassengers = this.fetchPassengers.bind(this)
    this.fetchDriver = this.fetchDriver.bind(this)
    this.fetchSlots = this.fetchSlots.bind(this)
  }

  componentDidMount() {
    // TODO: get token from redux store
    const asDriver = this.props.navigation.getParam('asDriver', null)
    const tripId = this.props.navigation.getParam('tripId', null)
    this.getTrip(tripId, asDriver, 'Bearer 12345')
  }

  async fetchDriver(driverId, token) {
    // eslint-disable-next-line no-console
    // fetch from server
    return {
      user_id: 'usr_fe4e267f-c29d-468f-855a-4b592cbdff1f',
      user_identifications: {
        identification_image_front: 'placeholder',
        identification_image_back: 'placeholder',
        selfie_image: 'placeholder',
      },
      email: 'test3@example.com',
      last_name: 'Test',
      phone: '999999999',
      first_name: 'Test',
    }
  }

  async fetchPassengers(userIds) {
    //TODO: fetch from server
    return [
      {
        user_id: 'usr_fe4e267f-c29d-468f-855a-4b592cbdff1f',
        user_identifications: {
          identification_image_front: 'placeholder',
          identification_image_back: 'placeholder',
          selfie_image: 'placeholder',
        },
        email: 'test3@example.com',
        last_name: 'Test',
        phone: '999999999',
        first_name: 'Test',
      },
      {
        user_id: 'usr_fe4e267f-c29d-468f-855a-4b592cbdff1f',
        user_identifications: {
          identification_image_front: 'placeholder',
          identification_image_back: 'placeholder',
          selfie_image: 'placeholder',
        },
        email: 'test3@example.com',
        last_name: 'Test',
        phone: '999999999',
        first_name: 'Test',
      },
    ]
  }

  async getUser(userId, token) {
    return await client
      .request({
        method: 'get',
        url: `/users/${userId}`,
        headers: {
          Authorization: token,
        },
      })
      .then(resp => {
        resp.data.phone = '999999999' // TODO: ask backend o add phone number
        // eslint-disable-next-line no-console
        console.log('PHONE', resp.data)
        return resp.data
      })
    /*
      {
      "avatar": "https://www.placecage.com/512/512",
      "first_name": "Another",
      "last_name": "User",
      "user_id": "usr_23456",
      "verifications": Object {
        "drivers_license": true,
        "identity": true,
        "phone": true,
      },
    */
  }

  async fetchDriver(driverId, token) {
    return this.getUser(driverId, token)
  }

  async fetchPassengers(userIds, token) {
    return await Promise.all(userIds.map(userId => this.getUser(userId, token)))
  }

  async fetchTrip(tripId, token) {
    return await client
      .request({
        method: 'get',
        url: `/trips/${tripId}`,
        headers: {
          Authorization: token,
        },
      })
      .then(resp => resp.data)
    /*
      {
        "available_seats": 3,
        "driver_id": "usr_12345",
        "etd": "2019-10-23T05:40:00.000Z",
        "route": Object {
          "end": "pnt_4",
          "start": "pnt_1",
        },
        "route_points": Array [
          "pnt_1",
          "pnt_2",
          "pnt_3",
          "pnt_4",
        ],
        "seats": 4,
        "trip_id": "tri_12345",
        "trip_route": Object {
          "end": Object {
            "id": "pnt_4",
            "name": "TOBALABA L1",
          },
          "start": Object {
            "id": "pnt_1",
            "name": "Centro Artesanal Pueblito Los Dominicos",
          },
        },
        "trip_route_points": Array [
          Object {
            "id": "pnt_1",
            "name": "Centro Artesanal Pueblito Los Dominicos",
          },
          Object {
            "id": "pnt_2",
            "name": "METRO MANQUEHUE",
          },
          Object {
            "id": "pnt_3",
            "name": "METRO ESCUELA MILITAR",
          },
          Object {
            "id": "pnt_4",
            "name": "TOBALABA L1",
          },
        ],
        "trip_status": "open",
        "vehicle_id": "veh_12345",
      }
    */
    // return {
    //   trip_status: 'open',
    //   created_at: '2019-10-22T16:41:55-04:00',
    //   route_points: [
    //     'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
    //     'spt_d5eb212a-ab53-4f0e-9e49-15f288ee2cbf',
    //   ],
    //   trip_id: 'tri_112b05c8-0973-4160-a40b-f0d588ec2503',
    //   etd: '2019-10-22T17:10:00.000Z',
    //   trip_route_points: [
    //     {
    //       city: 'SANTIAGO',
    //       icon:
    //         'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
    //       commune: 'PROVIDENCIA',
    //       lon: '-33,4202039',
    //       address:
    //         'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
    //       lat: '-70,6008346',
    //       name: 'Centro comercial Plaza San Pío, Vitacura 5255',
    //       type: "['shopping_mall', 'point_of_interest', 'establishment']",
    //     },
    //     {
    //       city: 'SANTIAGO',
    //       icon:
    //         'https://maps.gstatic.com/mapfiles/place_api/icons/train-71.png',
    //       commune: 'MAIPU',
    //       lon: '-70.74149089',
    //       address: 'Avda. Pajaritos 5090',
    //       lat: '-33.47735571',
    //       name: 'LAS PARCELAS',
    //       type: "['subway_station']",
    //     },
    //   ],
    //   driver_id: 'usr_fe4e267f-c29d-468f-855a-4b592cbdff1f',
    // }
  }

  async fetchSlots(tripId, token) {
    // eslint-disable-next-line no-console
    console.log(tripId, token)
    // TODO:fetch from server

    return [
      {
        slot_id: 'slo_27f78378-6cb0-4558-994b-62ba005e9a74',
        slot_status: 'accepted',
        user_id: 'usr_12345',
        created_at: '2019-10-21T10:30:20-04:00',
        route_point: {
          city: 'SANTIAGO',
          icon:
            'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
          commune: 'PROVIDENCIA',
          lon: '-33,4202039',
          address:
            'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
          lat: '-70,6008346',
          name: 'Centro comercial Plaza San Pío, Vitacura 5255',
          type: "['shopping_mall', 'point_of_interest', 'establishment']",
        },
      },
      {
        slot_id: 'slo_27f78378-6cb0-4558-994b-62ba005e9a74',
        slot_status: 'pending',
        user_id: 'usr_12345',
        created_at: '2019-10-21T10:30:20-04:00',
        route_point: {
          city: 'SANTIAGO',
          icon:
            'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
          commune: 'PROVIDENCIA',
          lon: '-33,4202039',
          address:
            'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
          lat: '-70,6008346',
          name: 'Centro comercial Plaza San Pío, Vitacura 5255',
          type: "['shopping_mall', 'point_of_interest', 'establishment']",
        },
      },
      {
        slot_id: 'slo_27f78378-6cb0-4558-994b-62ba005e9a74',
        slot_status: 'rejected',
        user_id: 'usr_12345',
        created_at: '2019-10-21T10:30:20-04:00',
        route_point: {
          city: 'SANTIAGO',
          icon:
            'https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png',
          commune: 'PROVIDENCIA',
          lon: '-33,4202039',
          address:
            'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
          lat: '-70,6008346',
          name: 'Centro comercial Plaza San Pío, Vitacura 5255',
          type: "['shopping_mall', 'point_of_interest', 'establishment']",
        },
      },
    ]
  }

  async getTrip(tripId, asDriver, token) {
    this.setState(oldState => ({
      ...oldState,
      loading: true,
      tripId,
      asDriver,
      token,
    }))
    await this.fetchTrip(tripId, token)
      .then(trip => this.setState({ trip }))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
        Alert.alert('Hubo un error, intenta de nuevo más tarde', err)
      })

    await this.fetchDriver(this.state.trip.driver_id, this.state.token)
      .then(driver => this.setState({ driver }))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
        Alert.alert(
          'Error obtiendo la información del conductor, inténtalo más tarde',
          err
        )
      })

    await this.fetchSlots(tripId, token)
      .then(slots => {
        this.setState({ slots })
      })
      .catch(err => {
        Alert.alert('Hubo un error, intenta de nuevo más tarde', err)
      })

    const passengerIds = this.state.slots.map(slot => slot.user_id)
    await this.fetchPassengers(passengerIds, token)
      .then(passengers => {
        this.setState({ passengers })
      })
      .catch(err => {
        Alert.alert('Hubo un error, intenta de nuevo más tarde', err)
      })

    this.setState({ loading: false })
  }

  async fetchPassengers(tripId) {
    // eslint-disable-next-line no-console
    // fetch from server
    return [
      {
        status: 'pending',
        name: 'Pasajero 1',
        start: 'Inicio de partida',
        finish: 'Destino',
        phoneNumber: '+56984643021',
      },
      {
        status: 'accepted',
        name: 'Pasajero 2',
        start: 'Inicio de partida',
        finish: 'Destino 2',
        phoneNumber: '+56984643021',
      },
      {
        status: 'rejected',
        name: 'Pasajero 3',
        start: 'Inicio de partida',
        finish: 'Destino 3',
        phoneNumber: '+56984643021',
      },
    ]
  }

  renderPassengers(passengers, token) {
    const finishStop = this.state.trip
      ? this.state.trip.trip_route_points[
          this.state.trip.trip_route_points.length - 1
        ].name
      : 'cargando..'
    return passengers
      ? passengers.map((passenger, index) => (
          <TripRequestCard
            key={`passenger-${index}`}
            passenger={passenger}
            finishStop={finishStop}
            slot={this.state.slots[index]}
            token={token}
          />
        ))
      : null
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <DetailedTrip
            asDriver={this.state.asDriver}
            trip={this.state.trip}
            driver={this.state.driver}
            token={this.state.token}
          />
        )}
        {this.state.asDriver && !this.state.loading
          ? this.renderPassengers(this.state.passengers, this.state.token)
          : null}
      </ScrollView>
    )
  }
}

DetailedTripScreen.propTypes = {
  asDriver: PropTypes.bool,
  tripId: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
}

DetailedTripScreen.defaultProps = {
  asDriver: false,
  tripId: '0',
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

const mapPropsToState = state => ({
  user: state.user,
})

const mapDispatchToState = () => ({})

export default connect(
  mapPropsToState,
  mapDispatchToState
)(withNavigation(DetailedTripScreen))
