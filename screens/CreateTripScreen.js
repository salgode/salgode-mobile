import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Appearance } from 'react-native-appearance'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { Button } from 'native-base'
import CardInputSelector from '../components/CardInputSelector'
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

const colorScheme = Appearance.getColorScheme()

class CreateTripScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
    pickedDate: null,
  }

  componentDidMount = () => {
    this.props.getAllSpots(this.props.user.token)
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
    const { navigation, startStop, endStop, startTime, spots } = this.props
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
    const filteredSlots = spotsFilter(spots, [startStop, endStop])

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.group}>
            <CardInputSelector
              text="#Desde"
              placeHolder="Filtra por Comuna o Parada"
              onSelect={item => this.props.setStartStop(item)}
              onClear={this.props.clearStartStop}
              data={filteredSlots}
            />

            <CardInputSelector
              text="#A"
              placeHolder="Filtra por Comuna o Parada"
              onSelect={item => this.props.setEndStop(item)}
              onClear={this.props.clearEndStop}
              data={filteredSlots}
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
        </ScrollView>

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
    backgroundColor: '#fff',
    flex: 1,
  },
  contentContainer: {
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
    marginBottom: 40,
    marginLeft: 20,
    marginRight: 20,
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
