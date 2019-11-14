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

  render() {
    const { navigation, startPlace, requestedTrips } = this.props
    return (
      <View style={styles.container}>
        <View>
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
                  <Text>
                    No sabes donde buscar? Ve el mapa de puntos de SalgoDe
                  </Text>
                </Button>
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
  getOpenTrips: token => dispatch(getOpenTrips(token)),
})

ChooseTripsScreen.navigationOptions = ({ navigation }) => ({
  title: 'Busca tu viaje',
  headerBackTitle: lang.default.back,
  headerRightContainerStyle: { marginRight: '3%' },
  headerRight: (
    <Button transparent onPress={() => navigation.navigate('SpotsMap')}>
      <Text>Mapa</Text>
    </Button>
  ),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChooseTripsScreen)
