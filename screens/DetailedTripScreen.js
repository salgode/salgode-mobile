import React, { Component } from 'react'
import { StyleSheet, Alert } from 'react-native'
import PropTypes from 'prop-types'
import DetailedTrip from '../components/Trips/Trip/DetailedTrip'
import { Spinner } from 'native-base'
import TripRequestCard from '../components/Trips/Trip/TripRequestCard'
import { ScrollView } from 'react-native-gesture-handler'

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
      token: '',
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
    // this.setState({
    //   // asDriver: this.props.navigation.getParam('asDriver', false),
    //   asDriver: true,
    // })
    // // this.setState({ tripId: this.props.navigation.getParam('tripId', '') })
    // // this.setState({ token: '' }) // TODO: get token from redux store
    console.log(this.props.navigation)
    const asDriver = this.props.navigation.getParam('asDriver', null)
    const tripId = this.props.navigation.getParam('tripId', null)
    console.log('DidMount')
    console.log(asDriver, tripId)
    this.getTrip(tripId, asDriver, '')
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

  async fetchTrip(tripId, token) {
    // eslint-disable-next-line no-console
    console.log(tripId, token)
    // TODO: fetch from server
    return {
      trip_status: open,
      created_at: '2019-10-22T16:41:55-04:00',
      route_points: [
        'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
        'spt_d5eb212a-ab53-4f0e-9e49-15f288ee2cbf',
      ],
      trip_id: 'tri_112b05c8-0973-4160-a40b-f0d588ec2503',
      etd: '2019-10-22T17:10:00.000Z',
      trip_route_points: [
        {
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
        {
          city: 'SANTIAGO',
          icon:
            'https://maps.gstatic.com/mapfiles/place_api/icons/train-71.png',
          commune: 'MAIPU',
          lon: '-70.74149089',
          address: 'Avda. Pajaritos 5090',
          lat: '-33.47735571',
          name: 'LAS PARCELAS',
          type: "['subway_station']",
        },
      ],
      driver_id: 'usr_fe4e267f-c29d-468f-855a-4b592cbdff1f',
    }
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
    ]
  }

  async getTrip(tripId, asDriver, token) {
    this.setState(oldState => ({
      ...oldState,
      loading: true,
      tripId,
      asDriver,
    }))
    console.log(tripId, asDriver)
    await this.fetchTrip(tripId, token)
      .then(trip => {
        this.setState({ trip })
        console.log('FETCH TRIP')
        console.log(trip)
        this.fetchDriver(trip.driver_id, token).then(driver =>
          this.setState({ driver }).catch(err => Alert.alert('0!', err))
        )
      })
      .catch(err => {
        this.setState({ loading: false })
        Alert.alert('1. Hubo un error, intenta de nuevo más tarde', err)
      })
    await this.fetchSlots(tripId, token)
      .then(slots => {
        this.setState({ slots })
        const passengerIds = slots.map(slot => slot.user_id)
        this.fetchPassengers(passengerIds).then(passengers =>
          this.setState({ passengers })
        )
      })
      .catch(err => {
        Alert.alert('2. Hubo un error, intenta de nuevo más tarde', err)
      })

    this.setState({ loading: false })
    console.log('STATE')
    console.log(this.state)
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

  renderPassengers(passengers, trip) {
    const locationsLength = trip.route_points.length
    const finalLocation = trip.route_points[locationsLength - 1].name
    return passengers.map((passenger, index) => (
      <TripRequestCard
        key={`passenger-${index}`}
        passenger={passenger}
        finalLocation={finalLocation}
      />
    ))
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
          />
        )}
        {this.state.asDriver && !this.state.loading
          ? this.renderPassengers(this.state.passengers)
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

export default DetailedTripScreen
