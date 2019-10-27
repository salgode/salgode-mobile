import React, { Component } from 'react'
import {
  setSearchStartPlace,
  cleanSearchStartPlace,
  setSearchEndPlace,
  cleanSearchEndPlace,
} from '../redux/actions/trips'
import { getAllSpots } from '../redux/actions/spots'
import { View, StyleSheet, Alert, AsyncStorage, Text } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'
import { getOwnProfile } from '../redux/actions/user'
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
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      avalibleTrips: null,
      rerender: true,
    }

    this.onRequestTrip = this.onRequestTrip.bind(this)
    this.setSearchStartPlaceFetch = this.setSearchStartPlaceFetch.bind(this)
  }

  async componentDidMount() {
    if (!this.props.user.vehicles) {
      const userResponse = await this.props.loadUser(this.props.user.token, this.props.user.userId)
      if (userResponse.error) {
        Alert.alert(
          'Error al iniciar sesión',
          'Hubo un problema con iniciar sesión por favor intente de nuevo.',
          [
            {
              text: 'Intentar de nuevo',
              onPress: () => {
                AsyncStorage.removeItem('@userToken')
                AsyncStorage.removeItem('@userId')
                this.props.navigation.navigate('Login')
              },
            },
          ]
        )
      }
    }
    this.props.getAllSpots(this.props.user.token)
  }

  onRequestTrip(stops, tripId) {
    this.props.navigation.navigate('RequestTrip', {
      stops: stops,
      tripId,
    })
  }

  async setSearchStartPlaceFetch(item) {
    const response = await this.props.setSearchStartPlace(item, this.props.user.token)
    if (response.error) {
      Alert.alert(
        'Error obteniendo viajes',
        'Hubo un problema obteniendo los viajes. Por favor intentalo de nuevo.'
      )
    }
  }

  render() {
    const { navigation, startPlace, endPlace, requestedTrips } = this.props
    return (
      <View style={styles.container}>
        <View>
          <CardInput
            onTouchablePress={() =>
              navigation.navigate('SpotSelectorScreen', {
                title: 'Buscas #Desde',
                text: '#Desde',
                onClearPress: this.props.cleanSearchStartPlace,
                onItemPress: this.setSearchStartPlaceFetch,
                data: this.props.spots,
              })
            }
            placeholder="Filtra por Comuna o Parada"
            value={startPlace ? startPlace.name : ''}
            text="#Desde"
            editable={false}
            onClearPress={this.props.cleanSearchStartPlace}
          />
          {/* <CardInput
            onTouchablePress={() =>
              navigation.navigate('SpotSelectorScreen', {
                title: 'Buscas #A',
                text: '#A',
                onClearPress: this.props.cleanSearchEndPlace,
                onItemPress: this.props.setSearchEndPlace,
                data: this.props.spots,
              })
            }
            placeholder="Filtra por Comuna o Parada"
            value={endPlace ? endPlace.name : ''}
            text="#A"
            editable={false}
            onClearPress={this.props.cleanSearchEndPlace}
          /> */}
        </View>

        <View>
          {requestedTrips.length  > 0 ? 
          <ChooseTrips
            onSend={this.onRequestTrip}
            onReload={this.setSearchStartPlaceFetch}
            trips={requestedTrips.map(trip => parseTripInfo(trip))}
          />
          :
          <Text>
            No se ha encontrado ningun viaje segun lo solicitado
          </Text>
          }
        </View>
      </View>
    )
  }
}

ChooseTripsScreen.propTypes = {
  isRequestedTrips: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  requestedTrips: PropTypes.array.isRequired,
  setSearchStartPlace: PropTypes.func.isRequired,
  cleanSearchStartPlace: PropTypes.func.isRequired,
  setSearchEndPlace: PropTypes.func.isRequired,
  cleanSearchEndPlace: PropTypes.func.isRequired,
  getAllSpots: PropTypes.func.isRequired,
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
    requestedTrips: state.trips.requestedTrips || [],
    startPlace: state.trips.startPlace,
    endPlace: state.trips.endPlace,
    spots: state.spots.spots || [],    
  }
}

const mapDispatchToProps = dispatch => ({
  setSearchStartPlace: (item, token) => dispatch(setSearchStartPlace(item, token)),
  cleanSearchStartPlace: () => dispatch(cleanSearchStartPlace()),
  setSearchEndPlace: item => dispatch(setSearchEndPlace(item)),
  cleanSearchEndPlace: () => dispatch(cleanSearchEndPlace()),
  getAllSpots: token => dispatch(getAllSpots(token)),
  loadUser: (token, id) => dispatch(getOwnProfile(token, id)),
})

ChooseTripsScreen.navigationOptions = {
  title: 'Busca tu viaje',
  headerBackTitle: lang.default.back,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTripsScreen)
