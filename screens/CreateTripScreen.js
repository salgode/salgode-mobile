import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Appearance } from 'react-native-appearance'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { Button } from 'native-base'
import {
  setStartStop,
  setEndStop,
  setStartTime,
  clearStartStop,
  clearEndStop,
} from '../redux/actions/createtrip'
import { getAllSpots } from '../redux/actions/spots'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { spotsFilter } from '../utils/spotsFilter'
import Colors from '../constants/Colors'
import PropTypes from 'prop-types'
import CardInput from '../components/CardInput'

const colorScheme = Appearance.getColorScheme()

class CreateTripScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    pickedDate: null,
  }

  componentDidMount = () => {
    this.props.getAllSpots()
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
    } = this.props
    const disabled = startStop && endStop && startTime ? false : true
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

    return (
      <View style={styles.container}>
        <View>
          <CardInput
            onTouchablePress={() =>
              navigation.navigate('SpotSelectorScreen', {
                title: 'Seleccionar #Desde',
                text: '#Desde',
                onClearPress: clearStartStop,
                onItemPress: setStartStop,
                data: filteredSpots,
              })
            }
            placeholder="Filtra por Comuna o Parada"
            value={startStop.name}
            text="#Desde"
            editable={false}
            onClearPress={clearStartStop}
          />

          <CardInput
            onTouchablePress={() =>
              navigation.navigate('SpotSelectorScreen', {
                title: 'Seleccionar #A',
                text: '#A',
                onClearPress: clearStartStop,
                onItemPress: setEndStop,
                data: filteredSpots,
              })
            }
            placeholder="Filtra por Comuna o Parada"
            value={endStop.name}
            text="#A"
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
  }
}

CreateTripScreen.navigationOptions = {
  header: null,
}

CreateTripScreen.propTypes = {
  getAllSpots: PropTypes.func.isRequired,
  setStartTime: PropTypes.func.isRequired,
  setStartStop: PropTypes.func.isRequired,
  setEndStop: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  clearStartStop: PropTypes.func.isRequired,
  clearEndStop: PropTypes.func.isRequired,
  spots: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  whiteText: {
    color: 'white',
  },
})

const mapStateToProps = ({ user, createTrip, spots }) => {
  return {
    user: user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    startTime: createTrip.startTime,
    spots: spots.spots,
  }
}

const mapDispatchToProps = {
  loginUser,
  setStartStop,
  setEndStop,
  setStartTime,
  clearStartStop,
  clearEndStop,
  getAllSpots,
}
CreateTripScreen.navigationOptions = {
  title: 'Crear un viaje',
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripScreen)
