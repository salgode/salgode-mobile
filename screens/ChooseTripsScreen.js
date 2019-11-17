import React, { Component } from 'react'
import {
  setSearchStartPlace,
  cleanSearchStartPlace,
  setSearchEndPlace,
  cleanSearchEndPlace,
  getOpenTrips,
} from '../redux/actions/trips'
import { getAllSpots } from '../redux/actions/spots'
import { View, StyleSheet, Alert, Text } from 'react-native'
import { Spinner, Button, Card, CardItem } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'
import EmptyState from '../components/EmptyState/EmptyState'
import { getOwnProfile } from '../redux/actions/user'
import noTrips from '../assets/images/notrips.png'
import Colors from '../constants/Colors'
import CardInput from '../components/CardInput'
import SalgoDeMap from '../components/SalgoDeMap'
import lang from '../languages/es'

function collectPlaces(allTrips) {
  if (allTrips && allTrips.length) {
    const tripRoutesArray = allTrips.map(obj => obj.trip_route_points)
    const allPlaces = [].concat.apply([], tripRoutesArray)
    return allPlaces.filter(
      (place, index) =>
        allPlaces.findIndex(i => i.place_id === place.place_id) === index
    )
  }
  return []
}

class ChooseTripsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      isFormHidden: true,
      showActions: false,
    }

    this.onRequestTrip = this.onRequestTrip.bind(this)
    this.setSearchStartPlaceFetch = this.setSearchStartPlaceFetch.bind(this)
    this.onReload = this.onReload.bind(this)
    this.pressMarker = this.pressMarker.bind(this)
    this.onTapMap = this.onTapMap.bind(this)
    this.goToDetails = this.goToDetails.bind(this)
    this.getAllTrips = this.getAllTrips.bind(this)
  }

  async componentDidMount() {
    this.setState({ loading: true })
    this.props.getAllSpots(this.props.user.token)
    this.props.getOpenTrips(this.props.user.token).then(() => {
      this.setState({ loading: false })
    })
  }

  onRequestTrip(stops, tripId) {
    this.props.navigation.navigate('RequestTrip', {
      stops,
      tripId,
    })
  }

  async getAllTrips() {
    this.setState({ loading: true })
    await this.props.getOpenTrips(this.props.user.token)
    this.setState({ loading: false })
  }

  async setSearchStartPlaceFetch(item, reset) {
    if (item && Object.keys(item).length > 0) {
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

  pressMarker(marker) {
    this.setState({ showActions: true, poi: marker })
  }

  onTapMap() {
    this.setState({ showActions: false })
  }

  async goToDetails() {
    this.setState({
      isFormHidden: false,
      showActions: false,
    })
    await this.setSearchStartPlaceFetch(this.state.poi, true)
  }

  render() {
    const { navigation, startPlace, requestedTrips } = this.props
    const { isFormHidden } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.headerSelect}>
          <Button
            block
            style={[
              styles.headerButton,
              { backgroundColor: isFormHidden ? '#f4f7fc' : '#0000FF' },
            ]}
            borderRadius={0}
            onPress={() => this.setState({ isFormHidden: false })}
          >
            <Text
              style={[
                styles.headerText,
                { color: isFormHidden ? 'black' : 'white' },
              ]}
            >
              Viajes
            </Text>
          </Button>
          <Button
            block
            style={[
              styles.headerButton,
              { backgroundColor: isFormHidden ? '#0000FF' : '#f4f7fc' },
            ]}
            borderRadius={0}
            onPress={() => this.setState({ isFormHidden: true })}
          >
            <Text
              style={[
                styles.headerText,
                { color: isFormHidden ? 'white' : 'black' },
              ]}
            >
              Mapa
            </Text>
          </Button>
        </View>
        {this.state.isFormHidden ? (
          <>
            <View style={{ flex: 1 }}>
              <View style={styles.mapContainer}>
                <SalgoDeMap
                  showLocation
                  markers={collectPlaces(requestedTrips)}
                  showPath
                  multiPaths={requestedTrips.map(rt => rt.trip_route_points)}
                  pressMarker={this.pressMarker}
                  onTapMap={this.onTapMap}
                  cluster={true}
                />
              </View>
              {!this.state.loading && (
                <View style={styles.mapButtonContainer}>
                  <Button
                    block
                    light
                    style={styles.mapButton}
                    borderRadius={25}
                    onPress={() => this.getAllTrips()}
                  >
                    <Text>Mostrar todos los viajes</Text>
                  </Button>
                </View>
              )}
              {this.state.loading && (
                <View style={styles.loadingView}>
                  <Spinner color="blue" />
                </View>
              )}
            </View>
            {this.state.showActions && (
              <Card style={styles.actions}>
                <CardItem header>
                  <Text>¿Qué deseas hacer?</Text>
                </CardItem>
                <CardItem style={styles.info}>
                  <Text style={{ fontWeight: 'bold' }}>
                    {this.state.poi.place_name}
                  </Text>
                </CardItem>
                <CardItem style={styles.actionButtons}>
                  <Button
                    block
                    style={styles.actionButton}
                    borderRadius={10}
                    onPress={() => {
                      this.onTapMap()
                      this.goToDetails()
                    }}
                    color={'#0000FF'}
                  >
                    <Text style={styles.actionButtonText}>Buscar viajes</Text>
                  </Button>
                </CardItem>
                <CardItem footer>
                  <Text style={styles.warning}>
                    Recuerda que si el punto corresponde al destino del viaje,
                    este no aparecerá en el buscador
                  </Text>
                </CardItem>
              </Card>
            )}
          </>
        ) : (
          <>
            <View style={{ marginHorizontal: 15 }}>
              <CardInput
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
              />
            </View>
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
                  <>
                    <EmptyState
                      image={noTrips}
                      text="No se ha encontrado ningún viaje según lo solicitado."
                    />
                    <Button
                      transparent
                      onPress={() => this.props.navigation.navigate('SpotsMap')}
                      style={{ alignSelf: 'center' }}
                    >
                      <Text style={{ textAlign: 'center' }}>
                        ¿No sabes dónde buscar? Puedes ver el mapa haciendo
                        click en el menú de arriba
                      </Text>
                    </Button>
                  </>
                )}
              </>
            )}
          </>
        )}
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
  startPTlace: PropTypes.object,
  getOpenTrips: PropTypes.func,
}

ChooseTripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
  },
  actionButtons: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actions: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: '3%',
  },
  container: {
    backgroundColor: Colors.lightBackground,
    paddingTop: 15,
    ...StyleSheet.absoluteFill,
  },
  headerButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerButton: {
    flex: 1,
  },
  headerSelect: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
  },
  headerText: {
    color: 'white',
  },
  info: {
    alignItems: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },
  loadingView: {
    alignItems: 'center',
    backgroundColor: '#f4f7fc',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    opacity: 0.7,
    position: 'absolute',
    width: '100%',
  },
  mapButton: {
    paddingHorizontal: 20,
  },
  mapButtonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  mapContainer: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  warning: {
    fontSize: 10,
  },
  warningContainer: {
    marginTop: 0,
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
  getOpenTrips: token => dispatch(getOpenTrips(token)),
})

ChooseTripsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Busca tu viaje',
  headerBackTitle: lang.default.back,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTripsScreen)
