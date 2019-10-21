import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { DatePicker, Button } from 'native-base'
import CardInput from '../components/CardInput'
import CardInputSelector from '../components/CardInputSelector'
import { setStartStop, setEndStop, setStops } from '../redux/actions/createtrip'
import DateTimePicker from 'react-native-modal-datetime-picker'

class CreateTripScreen extends Component {
  state = {
    isDateTimePickerVisible: false,
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
  }

  handleDatePicked = date => {
    console.log('A date has been picked: ', date)
    this.hideDateTimePicker()
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.group}>
            <CardInputSelector
              text="#Donde"
              onSelect={item => this.props.setStartStop(item.parada)}
            />

            <CardInputSelector
              text="#A"
              onSelect={item => this.props.setEndStop(item.parada)}
            />
          </View>

          <View style={styles.group}>
            <Button onPress={this.showDateTimePicker}>
              <Text>Show DatePicker</Text>
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

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  loginUser,
  setStartStop,
  setEndStop,
  setStops,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripScreen)
