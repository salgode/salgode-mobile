import React, { Component } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import {
  setSearchStartPlace,
  cleanSearchStartPlace,
  setSearchEndPlace,
  cleanSearchEndPlace,
} from '../redux/actions/trips'
import { getAllSpots } from '../redux/actions/spots'
import { View, StyleSheet, Alert, AsyncStorage, Text } from 'react-native'
import { Spinner, Button } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'
import EmptyState from '../components/EmptyState/EmptyState'
import { getOwnProfile } from '../redux/actions/user'
import noTrips from '../assets/images/notrips.png'
import Colors from '../constants/Colors'
import CardInput from '../components/CardInput'
import lang from '../languages/es'

class ChooseTripsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

    this.onRequestTrip = this.onRequestTrip.bind(this)
    this.setSearchStartPlaceFetch = this.setSearchStartPlaceFetch.bind(this)
    this.onReload = this.onReload.bind(this)
  }

  async componentDidMount() {
    this.props.getAllSpots(this.props.user.token)
    this.getLocationFromAddress()
  }

  onRequestTrip(stops, tripId) {
    this.props.navigation.navigate('RequestTrip', {
      stops,
      tripId,
    })
  }

  async setSearchStartPlaceFetch(item, reset) {
    if (item && Object.keys(item).length > 0) {
      const { requestedTrips } = this.props
      if (reset) {
        this.setState({ loading: true })
      }
      const response = await this.props.setSearchStartPlace(
        item,
        this.props.user.token
      )
      if (reset) {
        this.setState({ loading: false })
      }
      if (response.error) {
        Alert.alert(
          'Error obteniendo viajes',
          'Hubo un problema obteniendo los viajes. Por favor inténtalo de nuevo.'
        )
      }
    }
  }

  onReload() {
    const { startPlace } = this.props
    if (startPlace && Object.keys(startPlace).length > 0) {
      this.setSearchStartPlaceFetch(startPlace, false)
    }
  }

  render() {
    const { navigation, startPlace, endPlace, requestedTrips } = this.props
    return (
      <View style={styles.container}>
        {/*<CardInput
          onTouchablePress={() =>
            navigation.navigate('SpotSelectorScreen', {
              title: 'Buscas #SalgoDe',
              text: '#SalgoDe',
              onClearPress: this.props.cleanSearchStartPlace,
              onItemPress: i => this.setSearchStartPlaceFetch(i, true),
              data: this.props.spots,
            })
          }
          placeholder="Filtra por Comuna o Parada"
          value={startPlace ? startPlace.place_name : ''}
          text="#SalgoDe"
          editable={false}
          onClearPress={this.props.cleanSearchStartPlace}
        />*/}
        <GooglePlacesAutocomplete
          placeholder="Buscar"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'}
          listViewDisplayed="auto"
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            console.log(data);
            console.log(details);
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyA2E5Qx-fs1XYDyi6tiYGOWD8LS7dp1uag',
            language: 'es', // language of the results
            types: 'address', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={true}
          currentLocationLabel="Posición Actual"
          nearbyPlacesAPI="GoogleReverseGeocoding" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}
          debounce={200}
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
        {this.state.loading && <Spinner color="blue" />}
        {!this.state.loading && (
          <>
            {requestedTrips.length > 0 ? (
              <ChooseTrips
                onSend={this.onRequestTrip}
                onReload={this.onReload}
                trips={requestedTrips}
              />
            ) : (
              <EmptyState
                image={noTrips}
                text="No se ha encontrado ningún viaje según lo solicitado."
              />
            )}
          </>
        )}
        {/* <View> */}
        <Button
          transparent
          onPress={() => this.props.navigation.navigate('SpotsMap')}
          style={{ alignSelf: 'center' }}
        >
          <Text>Ve el mapa de puntos de SalgoDe</Text>
        </Button>
        {/* </View> */}
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
  setSearchStartPlace: (item, token) =>
    dispatch(setSearchStartPlace(item, token)),
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
