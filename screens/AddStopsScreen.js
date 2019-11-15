import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { createTrip } from '../redux/actions/createtrip'
import { Button, Icon, Card, CardItem } from 'native-base'
import { spotsFilter } from '../utils/spotsFilter'
import Colors from '../constants/Colors'
import CardInput from '../components/CardInput'
import SalgoDeMap from '../components/SalgoDeMap'
import { analytics, ANALYTICS_CATEGORIES } from '../utils/analytics'

// TODO: Delete this function
const fakePlaces = (spots) => {
  let final = []
  if (spots && spots.length >= 10) {
    for (let i in [1,2,3,4,5,6,7,8]) {
      final.push(spots[i])
    }
    Object.assign(final[0], {
      lat: -33.43178,
      lon: -70.5453808,
    })
    Object.assign(final[1], {
      lat: -33.4469777,
      lon: -70.6298197,
    })
    Object.assign(final[2], {
      lat: -33.69526,
      lon: -71.214668,
    })
    Object.assign(final[3], {
      lat: -33.443699,
      lon: -70.633053,
    })
    Object.assign(final[4], {
      lat: -33.436248,
      lon: -70.650219,
    })
    Object.assign(final[5], {
      lat: -33.436195,
      lon: -70.6508967,
    })
    Object.assign(final[6], {
      lat: -33.4496991,
      lon: -70.6884408,
    })
    Object.assign(final[7], {
      lat: -33.3580534,
      lon: -70.5066107,
    })
  }
  return final
}

class AddStopsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stops: [],
      loading: false,
      isFormHidden: false,
      showActions: false,
    }
  }

  cleanInput = index => {
    const newStops = this.state.stops.filter((stop, i) => {
      if (i !== index) {
        return true
      }
    })
    this.setState({ stops: newStops })
  }

  createTrip = async () => {
    this.setState({ loading: true })
    const { startStop, endStop, startTime, user } = this.props
    const { stops } = this.state
    const stops_ids = stops.map(stop => {
      return stop.id
    })
    const route_points = [startStop.id].concat(stops_ids, endStop.id)
    const response = await this.props.dispatchCreateTrip(
      route_points,
      startTime,
      user.vehicles[0].vehicle_id,
      user.token
    )
    this.setState({ loading: false })
    if (response.error) {
      Alert.alert(
        'Error de creación',
        'Hubo un problema al crear tu viaje. Por favor inténtalo de nuevo.'
      )
    } else {
      Alert.alert('Creación exitosa', 'Tu viaje ha sido publicado!')
      analytics.newEvent(
        ANALYTICS_CATEGORIES.AsDriver.name,
        ANALYTICS_CATEGORIES.AsDriver.actions.Create,
        user.userId
      )
      this.props.navigation.popToTop()
    }
  }

  renderStops = () => {
    const { stops } = this.state
    return stops.map((stop, index) => {
      return (
        <View key={index} style={styles.textView}>
          <View
            style={{
              ...styles.stopContainer,
              justifyContent: 'flex-start',
              width: '85%',
            }}
          >
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              #Parada {index + 1}{' '}
            </Text>
            <Text numberOfLines={1} style={{ width: '75%' }}>
              {stop.name}
            </Text>
          </View>
          <Button icon transparent onPress={() => this.cleanInput(index)}>
            <Icon name="close" />
          </Button>
        </View>
      )
    })
  }

  pressMarker = marker => {
    this.setState({
      showActions: true,
      poi: marker,
    })
  }

  onTapMap = () => {
    this.setState({ showActions: false })
  }

  render() {
    const { startStop, endStop, navigation } = this.props
    const { stops, showActions } = this.state
    const filteredSpots = spotsFilter(this.props.spots, [
      startStop,
      endStop,
      ...stops,
    ])
    // TODO: Add initial Region
    const fakeSpots = fakePlaces(this.props.spots)
    return (
      <View style={styles.container}>
        {this.state.isFormHidden ? (
          <View style={styles.mapContainer}>
            <View style={{ flex: 1 }}>
              <SalgoDeMap
                markers={fakeSpots}
                showPath
                path={[
                  startStop,
                  ...stops,
                  endStop,
                ]}
                start={startStop}
                end={endStop}
                pressMarker={this.pressMarker}
                onTapMap={this.onTapMap}
              />
            </View>
            {showActions && (
              <Card style={styles.actions}>
                <CardItem style={styles.info}>
                  <Text style={{ fontWeight: 'bold' }}>{this.state.poi.name}</Text>
                  <Text>{this.state.poi.address}</Text>
                </CardItem>
                <CardItem style={styles.actionButtons}>
                  {this.state.stops.find(sp => sp.id === this.state.poi.id) ? (
                    <Button
                      block
                      style={styles.actionButton}
                      borderRadius={10}
                      onPress={() => {
                        this.cleanInput(
                          this.state.stops.findIndex(sp => sp.id === this.state.poi.id)
                        )
                        this.onTapMap()
                      }}
                      color={'#0000FF'}
                    >
                      <Text
                        style={styles.actionButtonText}
                      >
                        Quitar parada
                      </Text>
                    </Button>
                  ) : (
                    <>
                      {this.state.poi.id === startStop.id ? (
                        <Text>Inicio del viaje</Text>
                      ) : this.state.poi.id === endStop.id ? (
                        <Text> Fin del viaje</Text>
                      ) : (
                        <Button
                          block
                          style={styles.actionButton}
                          borderRadius={10}
                          onPress={() => {
                            this.setState({
                              stops: this.state.stops.concat(this.state.poi)
                            })
                            this.onTapMap()
                          }}
                          color={'#0000FF'}
                        >
                          <Text
                            style={styles.actionButtonText}
                          >
                            Agregar parada
                          </Text>
                        </Button>
                      )}
                    </>
                  )}
                </CardItem>
              </Card>
            )}
          </View>
        ) : (
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.group}>
              <View style={styles.stopContainer}>
                <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                  #SalgoDe{' '}
                </Text>
                <Text>{startStop.name}</Text>
              </View>
              <View style={styles.stopContainer}>
                <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                  #Hasta{' '}
                </Text>
                <Text>{endStop.name}</Text>
              </View>
            </View>
            <View style={styles.group}>
              <Text style={styles.centeredText}>
                Agrega paradas extra (opcional)
              </Text>
              {this.renderStops()}
              <CardInput
                onTouchablePress={() =>
                  navigation.navigate('SpotSelectorScreen', {
                    title: 'Seleccionar #Parada',
                    text: '#Parada',
                    data: filteredSpots,
                    onItemPress: item =>
                      this.setState({ stops: stops.concat(item) }),
                  })
                }
                placeholder="Filtra por Comuna o Parada"
                text="#PasoPor"
                editable={false}
              />
            </View>
          </ScrollView>
        )}
        <Button
          block
          style={styles.showMoreButton}
          onPress={() => this.setState({
            isFormHidden: !this.state.isFormHidden,
            showActions: false,
          })}
        >
          {this.state.isFormHidden ? (
            <View style={styles.hideButtonContent}>
              <FontAwesome name="angle-double-down" size={20} />
              <Text>Mostrar paradas</Text>
            </View>
          ) : (
            <View style={styles.hideButtonContent}>
              <FontAwesome name="angle-double-up" size={20} />
              <Text>Agregar paradas desde el mapa</Text>
            </View>
          )}
        </Button>
        {this.state.loading && <ActivityIndicator />}
        {!this.state.loading && (
          <View>
            <Button block style={styles.addButton} onPress={this.createTrip}>
              <Text style={styles.whiteText}>Crear Viaje</Text>
            </Button>
          </View>
        )}
      </View>
    )
  }
}

AddStopsScreen.navigationOptions = {
  header: null,
}

const styles = StyleSheet.create({
  actions: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '3%',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 14,
    color: 'white',
  },
  addButton: {
    backgroundColor: Colors.mainBlue,
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  centeredText: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
  group: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  hideButtonContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mapContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  stopContainer: {
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
  },
  showMoreButton: {
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  textView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  whiteText: {
    color: 'white',
  },
})

const mapStateToProps = ({ user, createTrip, spots }) => {
  return {
    user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    startTime: createTrip.startTime,
    spots: spots.spots,
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchCreateTrip: (rp, st, vid, token) => dispatch(createTrip(rp, st, vid, token)),
})

AddStopsScreen.navigationOptions = {
  title: 'Añadir paradas',
  headerBackTitle: '', // TODO: que no diga 'Back'
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
