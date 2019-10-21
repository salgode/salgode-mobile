import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { DatePicker, Button } from 'native-base'
import CardInput from '../components/CardInput'
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

class CreateTripScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
  }

  componentDidMount = () => {
    console.log('create screen mounted')
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
    this.hideDateTimePicker()
  }

  render() {
    const { navigation, startStop, endStop, startTime } = this.props

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
              onSelect={item => this.props.setStartStop(item.parada)}
              onClear={this.props.clearStartStop}
              data={this.props.spots}
            />

            <CardInputSelector
              text="#A"
              placeHolder="Filtra por Comuna o Parada"
              onSelect={item => this.props.setEndStop(item.parada)}
              onClear={this.props.clearEndStop}
              data={this.props.spots}
            />
          </View>

          <View style={styles.group}>
            <Button
              style={{ justifyContent: 'center' }}
              onPress={this.showDateTimePicker}
            >
              <Text>Hora/Fecha de Salida</Text>
            </Button>
            <DateTimePicker
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
            style={styles.addButton}
            disabled={startStop && endStop && startTime ? false : true}
            onPress={() => navigation.navigate('AddStopsScreen')}
          >
            <Text>Agrega una Parada</Text>
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
  group: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripScreen)
