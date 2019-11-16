import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert } from 'react-native'
import { Appearance } from 'react-native-appearance'
import { connect } from 'react-redux'
import { Button, Spinner, Card, CardItem } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import {
  setStartStop,
  setEndStop,
  setStartTime,
  clearStartStop,
  clearEndStop,
} from '../redux/actions/createtrip'
import { getAllSpots } from '../redux/actions/spots'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Colors from '../constants/Colors'
import PropTypes from 'prop-types'
import CardInput from '../components/CardInput'
import { getUserCars } from '../redux/actions/user'
import EmptyState from '../components/EmptyState/EmptyState'
import noTrips from '../assets/images/notrips.png'
import { spotsFilter } from '../utils/spotsFilter'
import Layout from '../constants/Layout'
import SalgoDeMap from '../components/SalgoDeMap'

const colorScheme = Appearance.getColorScheme()

class CreateTripScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      pickedDate: null,
      isFormHidden: false,
      showActions: false,
    }
  }

  componentDidMount = () => {
    this.props.getAllSpots(this.props.user.token)
    this.props.getUserCars(this.props.user.token)
  }

  componentDidUpdate(prevProps) {
    const { startStop } = this.props
    if (
      startStop &&
      prevProps.startStop &&
      prevProps.startStop.name &&
      !startStop.name
    ) {
      this.props.clearEndStop()
    }
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked = date => {
    if (date) {
      const actual = new Date()
      if (date.getTime() - actual.getTime() > 300000) {
        this.props.setStartTime(date)
        this.setState({ pickedDate: date })
      } else {
        Alert.alert(
          'Error en fecha de salida',
          'Debes planificar tu viaje con al menos 5 minutos de anticipación. Por favor inténtalo nuevamente'
        )
        this.props.setStartTime(undefined)
        this.setState({ pickedDate: undefined })
      }
    }
    this.hideDateTimePicker()
  }

  isVerifiedDriver = () => {
    return (
      this.props.user.vehicles &&
      this.props.user.vehicles.length &&
      this.props.user.license.front &&
      this.props.user.license.back
    )
  }

  pressMarker = marker => {
    this.setState({
      isFormHidden: true,
      showActions: true,
      poi: marker,
    })
  }

  onTapMap = () => {
    this.setState({ showActions: false })
  }

  resolvePoint = () => {
    const { startStop, endStop } = this.props
    const { poi } = this.state
    if (
      poi &&
      startStop &&
      poi.id === startStop.id
    ) {
      return 'start'
    }
    if (
      poi &&
      endStop &&
      poi.id === endStop.id
    ) {
      return 'end'
    }
    return false
  }

  render() {
    const {
      navigation,
      startStop,
      endStop,
      startTime,
      spots,
      clearStartStop,
      clearEndStop,
      setStartStop,
      setEndStop,
      loading,
    } = this.props

    // const disabled = startStop && endStop && startTime ? false : true
    const startStopValid = startStop
      ? Object.keys(startStop).length !== 0
      : false
    const endStopValid = endStop ? Object.keys(endStop).length !== 0 : false
    const disabled = !startStopValid || !endStopValid || !startTime
    const { pickedDate } = this.state
    let day
    let hours
    let minutes
    if (pickedDate) {
      day = pickedDate.toLocaleDateString()
      hours = pickedDate.getHours()
      minutes = pickedDate.getMinutes()
    }
    const filteredSpots = spotsFilter(spots, [startStop, endStop])

    if (loading) {
      return <Spinner color={'#0000FF'} />
    }

    const isConfirmedDriver = this.isVerifiedDriver()

    const resultResolvePoint = this.resolvePoint()
    const path = (endStop && endStop.id && startStop && endStop.id)
      ? [startStop, endStop]
      : []

    if (isConfirmedDriver) {
      return (
        <View style={styles.container}>
          {!this.state.isFormHidden && (
            <View style={styles.formContainer}>
              <View>
                <CardInput
                  onTouchablePress={() =>
                    navigation.navigate('SpotSelectorScreen', {
                      title: 'Seleccionar #SalgoDe',
                      text: '#SalgoDe',
                      onClearPress: clearStartStop,
                      onItemPress: setStartStop,
                      data: filteredSpots,
                    })
                  }
                  placeholder="Filtra por Comuna o Parada"
                  value={startStop.place_name}
                  text="#SalgoDe"
                  editable={false}
                  onClearPress={clearStartStop}
                />
                {startStop.name ? (
                  <CardInput
                    onTouchablePress={() =>
                      navigation.navigate('SpotSelectorScreen', {
                        title: 'Seleccionar #Hasta',
                        text: '#Hasta',
                        onClearPress: clearStartStop,
                        onItemPress: setEndStop,
                        data: filteredSpots,
                      })
                    }
                    placeholder="Filtra por Comuna o Parada"
                    value={endStop.place_name}
                    text="#Hasta"
                    editable={false}
                    onClearPress={clearEndStop}
                  />
                ) : <></>}
              </View>

              <View style={styles.group}>
                <Button style={styles.dateButton} onPress={this.showDateTimePicker}>
                  <Text>
                    {pickedDate
                      ? `${day} - ${hours}:${minutes < 10 ? '0' : ''}${minutes}`
                      : 'Selecciona Hora/Fecha de Salida'}
                  </Text>
                </Button>
                <DateTimePicker
                  isDarkModeEnabled={colorScheme === 'dark'}
                  mode="datetime"
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this.handleDatePicked}
                  onCancel={this.hideDateTimePicker}
                  minimumDate={new Date()}
                />
              </View>
              <View>
                <Button
                  block
                  style={disabled ? styles.addButtonDisabled : styles.addButton}
                  disabled={disabled}
                  onPress={() => navigation.navigate('AddStopsScreen')}
                >
                  <Text style={styles.whiteText}>Siguiente</Text>
                </Button>
              </View>
            </View>
          )}
          <View style={styles.mapView}>
            <View style={styles.mapContainer}>
              <SalgoDeMap
                showLocation
                markers={spots}
                pressMarker={this.pressMarker}
                onTapMap={this.onTapMap}
                start={startStop}
                end={endStop}
                showPath
                path={path}
              />
            </View>
            <View>
              <Button
                block
                style={styles.showMoreButton}
                onPress={() => this.setState({
                  isFormHidden: !this.state.isFormHidden
                })}
              >
                {this.state.isFormHidden ? (
                  <View style={styles.hideButtonContent}>
                    <FontAwesome name="angle-double-down" size={20} />
                    <Text>Abrir</Text>
                  </View>
                ) : (
                  <View style={styles.hideButtonContent}>
                    <FontAwesome name="angle-double-up" size={20} />
                    <Text>Ver mapa</Text>
                  </View>
                )}
              </Button>
            </View>
            {/*<Button
              transparent
              onPress={() => this.props.navigation.navigate('SpotsMap')}
              style={{ alignSelf: 'center' }}
            >
              <Text>Ve el mapa de puntos de SalgoDe</Text>
            </Button>*/}
          </View>
          {this.state.showActions && (
            <Card style={styles.actions}>
              <CardItem header>
                <Text>¿Qué deseas hacer?</Text>
              </CardItem>
              <CardItem style={styles.info}>
                <Text style={{ fontWeight: 'bold' }}>{this.state.poi.place_name}</Text>
                <Text>{this.state.poi.address}</Text>
              </CardItem>
              <CardItem style={styles.actionButtons}>
                {!resultResolvePoint ? (
                  <>
                    <Button
                      block
                      style={styles.actionButton}
                      borderRadius={10}
                      onPress={() => {
                        setStartStop(this.state.poi)
                        this.onTapMap()
                      }}
                      color={'#0000FF'}
                    >
                      <Text
                        style={styles.actionButtonText}
                      >
                        Inicio
                      </Text>
                    </Button>
                    <Button
                      block
                      style={styles.actionButton}
                      borderRadius={10}
                      onPress={() => {
                        setEndStop(this.state.poi)
                        this.onTapMap()
                        this.setState({ isFormHidden: false })
                      }}
                      disabled={!(startStop && startStop.id)}
                      color={'#0000FF'}
                    >
                      <Text
                        style={styles.actionButtonText}
                      >
                        Destino
                      </Text>
                    </Button>
                  </>
                ) : (
                  <Button
                    block
                    style={styles.actionButton}
                    borderRadius={10}
                    onPress={() => {
                      if (resultResolvePoint === 'start') {
                        clearStartStop()
                      }
                      if (resultResolvePoint === 'end') {
                        clearEndStop()
                      }
                      this.onTapMap()
                    }}
                    color={'#0000FF'}
                  >
                    <Text
                      style={styles.actionButtonText}
                    >
                      Quitar
                    </Text>
                  </Button>
                )}
              </CardItem>
            </Card>
          )}
        </View>
      )
    } else {
      return (
        <EmptyState
          image={noTrips}
          text="Para crear viajes debes registrar tu auto y enviar una foto por ambos lados de tu licencia"
        />
      )
    }
  }
}

CreateTripScreen.navigationOptions = {
  header: null,
}

CreateTripScreen.propTypes = {
  getAllSpots: PropTypes.func.isRequired,
  getUserCars: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setStartStop: PropTypes.func.isRequired,
  setEndStop: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  clearStartStop: PropTypes.func.isRequired,
  clearEndStop: PropTypes.func.isRequired,
  spots: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
  }).isRequired,
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
  addButtonDisabled: {
    backgroundColor: '#818E94',
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  container: {
    backgroundColor: Colors.lightBackground,
    flex: 1
  },
  dateButton: {
    backgroundColor: 'white',
    borderColor: Colors.mainGrey,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  formContainer: {
    width: Layout.window.width,
    backgroundColor: 'white',
  },
  group: {
    margin: 10,
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
  mapView: {
    flex: 1,
    position: 'relative',
    width: Layout.window.width
  },
  showMoreButton: {
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  viewContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white',
  },
})

const mapStateToProps = ({ user, createTrip, spots }) => {
  return {
    loading: spots.loading,
    user: user,
    startStop: createTrip.startStop || {},
    endStop: createTrip.endStop || {},
    startTime: createTrip.startTime,
    spots: spots.spots || [],
  }
}

const mapDispatchToProps = dispatch => ({
  setStartStop: item => dispatch(setStartStop(item)),
  setEndStop: item => dispatch(setEndStop(item)),
  setStartTime: time => dispatch(setStartTime(time)),
  clearStartStop: () => dispatch(clearStartStop()),
  clearEndStop: () => dispatch(clearEndStop()),
  getAllSpots: token => dispatch(getAllSpots(token)),
  getUserCars: token => dispatch(getUserCars(token)),
})

CreateTripScreen.navigationOptions = ({ navigation }) => ({
  title: 'Crear un viaje',
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripScreen)
