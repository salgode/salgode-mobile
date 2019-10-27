import React, { Component } from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'
import {
  fetchFutureTrips,
  setSearchStartPlace,
  cleanSearchStartPlace,
  setSearchEndPlace,
  cleanSearchEndPlace,
} from '../redux/actions/trips'
import Colors from '../constants/Colors'
import CardInput from '../components/CardInput'
import lang from '../languages/es'

const parseTripInfo = trip => {
  const { driver } = trip
  return {
    ...trip,
    timestamp: new Date(trip.etd_info.etd),
    driver: {
      name: driver.driver_name,
      phone: driver.driver_phone,
      reputation: driver.driver_score,
      id: driver.driver_id,
      //TODO Ajustar al response del server.
      avatar: driver.driver_avatar || '',
    },
    stops: trip.trip_route_points,
    tripId: trip.trip_id,
    trip_route: trip.trip_route,
  }
}

class ChooseTripsScreen extends Component {
  static navigationOptions = {
    // title: 'Pedir Viaje',
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      avalibleTrips: null,
      rerender: true,
      trips: [],
    }

    this.onRequestTrip = this.onRequestTrip.bind(this)
    this.getTrips = this.getTrips.bind(this)
    // console.log(this.props.user)
  }

  async componentDidMount() {
    await this.getTrips()
  }

  onRequestTrip(stops, tripId) {
    this.props.navigation.navigate('RequestTrip', {
      stops: stops,
      tripId,
    })
  }

  async getTrips() {
    const response = await this.props.fetchFutureTrips(this.props.user.token)
    if (response.error) {
      Alert.alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }

    this.setState({ trips: this.props.trips })
  }

  render() {
    const { navigation, startPlace, endPlace } = this.props
    return (
      <View style={styles.container}>
        <View>
          <CardInput
            onTouchablePress={() =>
              navigation.navigate('SpotSelectorScreen', {
                title: 'Buscas #Desde',
                text: '#Desde',
                onClearPress: this.props.cleanSearchStartPlace,
                onItemPress: this.props.setSearchStartPlace,
                data: [
                  // TODO: Esto deberia ser propio de una request (GET all places)
                  // Ojo que esta request ya se hace una vez en create trip
                  // Se debería hacer una sola vez al iniciar sesion y guardar los places en el storage
                  {
                    address:
                      'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
                    city: 'SANTIAGO',
                    id: 'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
                    name: 'Centro comercial Plaza San Pío, Vitacura 5255',
                  },
                  {
                    address:
                      'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
                    city: 'SANTIAGO',
                    id: 'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
                    name: 'Cenhuhcuahcusa',
                  },
                ],
              })
            }
            placeholder="Filtra por Comuna o Parada"
            value={startPlace ? startPlace.name : ''}
            text="#Desde"
            editable={false}
            onClearPress={this.props.cleanSearchStartPlace}
          />
          <CardInput
            onTouchablePress={() =>
              navigation.navigate('SpotSelectorScreen', {
                title: 'Buscas #A',
                text: '#A',
                onClearPress: this.props.cleanSearchEndPlace,
                onItemPress: this.props.setSearchEndPlace,
                data: [
                  // TODO: Esto deberia ser propio de una request (GET all places)
                  // Ojo que esta request ya se hace una vez en create trip
                  // Se debería hacer una sola vez al iniciar sesion y guardar los places en el storage
                  {
                    address:
                      'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
                    city: 'SANTIAGO',
                    id: 'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
                    name: 'Centro comercial Plaza San Pío, Vitacura 5255',
                  },
                  {
                    address:
                      'San Pío X 5255, Vitacura, Providencia, Región Metropolitana',
                    city: 'SANTIAGO',
                    id: 'spt_d1cd6d79-6fad-4b37-9f87-48e169c9d530',
                    name: 'Cenhuhcuahcusa',
                  },
                ],
              })
            }
            placeholder="Filtra por Comuna o Parada"
            value={endPlace ? endPlace.name : ''}
            text="#A"
            editable={false}
            onClearPress={this.props.cleanSearchEndPlace}
          />
        </View>

        <View>
          <ChooseTrips
            onSend={this.onRequestTrip}
            onReload={this.getTrips}
            trips={this.state.trips.map(trip => parseTripInfo(trip))}
          />
        </View>
      </View>
    )
  }
}

ChooseTripsScreen.propTypes = {
  isRequestedTrips: PropTypes.bool,
  fetchFutureTrips: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  trips: PropTypes.array.isRequired,
  setSearchStartPlace: PropTypes.func.isRequired,
  cleanSearchStartPlace: PropTypes.func.isRequired,
  setSearchEndPlace: PropTypes.func.isRequired,
  cleanSearchEndPlace: PropTypes.func.isRequired,
}

ChooseTripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightBackground,
    padding: 15,
    ...StyleSheet.absoluteFill,
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    trips: state.trips.open || [],
    startPlace: state.trips.startPlace,
    endPlace: state.trips.endPlace,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchFutureTrips: token => dispatch(fetchFutureTrips(token)),
  setSearchStartPlace: item => dispatch(setSearchStartPlace(item)),
  cleanSearchStartPlace: () => dispatch(cleanSearchStartPlace()),
  setSearchEndPlace: item => dispatch(setSearchEndPlace(item)),
  cleanSearchEndPlace: () => dispatch(cleanSearchEndPlace()),
})

ChooseTripsScreen.navigationOptions = {
  title: 'Busca tu viaje',
  headerBackTitle: lang.default.back,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTripsScreen)
