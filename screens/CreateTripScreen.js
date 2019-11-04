import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Appearance } from 'react-native-appearance'
import { connect } from 'react-redux'
import { Button, Spinner } from 'native-base'
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

const colorScheme = Appearance.getColorScheme()

class CreateTripScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    pickedDate: null,
  }

  componentDidMount = () => {
    this.props.getAllSpots(this.props.user.token)
    this.props.getUserCars(this.props.user.token)
    // .then(response => {
    // if (!response.payload.data.vehicle_id) {
    //   this.props.navigation.navigate('EditProfile')
    // }
    // })
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked = date => {
    this.props.setStartTime(date)
    this.setState({ pickedDate: date })
    this.hideDateTimePicker()
  }

  isVerifiedDriver = () => {
    return (
      this.props.user.verifications.license &&
      this.props.user.vehicles &&
      this.props.user.vehicles.length
    )
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
    const startStopValid = startStop ? Object.keys(startStop).length !== 0 : false
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
    const filteredSpots = spots // spotsFilter(spots, [startStop, endStop])

    if (loading) {
      return <Spinner color={'#0000FF'} />
    }

    const isConfirmedDriver = this.isVerifiedDriver()

    if (isConfirmedDriver) {
      return (
        <View style={styles.container}>
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
              value={startStop.name}
              text="#SalgoDe"
              editable={false}
              onClearPress={clearStartStop}
            />

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
              value={endStop.name}
              text="#Hasta"
              editable={false}
              onClearPress={clearEndStop}
            />
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
    flex: 1,
    paddingTop: 30,
  },
  dateButton: {
    backgroundColor: 'white',
    borderColor: Colors.mainGrey,
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: 20,
  },
  group: {
    margin: 10,
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
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    startTime: createTrip.startTime,
    spots: spots.spots,
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

CreateTripScreen.navigationOptions = {
  title: 'Crear un viaje',
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripScreen)
