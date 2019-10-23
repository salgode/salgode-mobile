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
      loadingTrip: true,
      loadingPassengers: true,
      trip: null,
      passengers: [],
      asDriver: false,
    }

    this.getTrip = this.getTrip.bind(this)
    this.fetchTrip = this.fetchTrip.bind(this)
    this.fetchPassengers = this.fetchPassengers.bind(this)
  }

  async componentDidMount() {
    this.setState({
      asDriver: this.props.navigation.getParam('asDriver', false),
    })
    this.getTrip(123, this.state.asDriver)
  }

  async fetchTrip(token) {
    // eslint-disable-next-line no-console
    console.log(token)
    // fetch from server
    return {
      trip_id: 'id',
      etd: 1571590002,
      driver: {
        name: 'Nombre',
        lastName: 'Apellido',
        email: 'example@mail.com',
        phone: '+56999999999',
        selfieLink: 'https://link1.com',
        driverLicenseLink: 'https://link2.com',
        dniFrontLink: 'https://link3.com',
        dniBackLink: 'https://link3.com',
        car: {
          plate: 'AABB99',
          color: 'Azul',
          brand: 'Toyota',
          model: 'Yaris',
        },
      },
      route_points: [
        {
          name: 'UC',
          address: 'Plaza italia',
          city: 'Santiago',
        },
        {
          name: 'Plaza Italia',
          address: 'Plaza italia',
          city: 'Santiago',
        },
        {
          name: 'Metro Tobalaba',
          address: 'Plaza italia',
          city: 'Santiago',
        },
      ],
      day: 'Lunes',
      hour: '16.00',
    }
  }

  async getTrip(tripId, asDriver) {
    this.setState({ loading: true })
    //_this.setState is not a function. (In '_this.setState({]

    await this.fetchTrip(tripId)
      .then(trip => this.setState({ trip }))
      .catch(err => {
        this.setState({ loading: false })
        Alert.alert('Hubo un error, intenta de nuevo más tarde', err)
      })
    await this.fetchPassengers(tripId, asDriver)
      .then(passengers => this.setState({ passengers }))
      .catch(err => {
        this.setState({ loadingPassengers: false })
        Alert.alert('Hubo un error, intenta de nuevo más tarde', err)
      })

    this.setState({ loading: false })
    this.setState({ loadingPassengers: false })
    /*
    if (user.error) {
      Alert.alert(
        'Hubo un problema iniciando sesión. Por favor intentalo de nuevo.'
      )
    } else {
      this.props.navigation.navigate('Trips')
    }*/
  }

  async fetchPassengers(tripId) {
    // eslint-disable-next-line no-console
    console.log(tripId)
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
          <DetailedTrip asDriver={this.state.asDriver} trip={this.state.trip} />
        )}
        {this.state.asDriver && !this.state.loadingPassengers
          ? this.renderPassengers(this.state.passengers, this.state.trip)
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
