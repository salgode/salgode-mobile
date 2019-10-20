import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Appearance } from 'react-native-appearance';
import { Text, Form, Item, Input, Label, Button, Picker, Icon } from 'native-base'
import DateTimePicker from "react-native-modal-datetime-picker";
import Layout from '../../constants/Layout'

const colorScheme = Appearance.getColorScheme();

class FindTripForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenDate: this.getDateTimestamp(new Date()),
      // 15 minutes offfset
      chosenTime: this.getTimeTimestamp(new Date()) + (15 * 60 * 1000),
      startLocation: undefined,
      inputValidity: false,
      isDatePickerVisible: false,
      isTimePickerVisible: false,
    }

    this.handleStartLocationPicked = this.handleStartLocationPicked.bind(this)

    this.showDatePicker = this.showDatePicker.bind(this)
    this.hideDatePicker = this.hideDatePicker.bind(this)
    this.handleDatePicked = this.handleDatePicked.bind(this)

    this.showTimePicker = this.showTimePicker.bind(this)
    this.hideTimePicker = this.hideTimePicker.bind(this)
    this.handleTimePicked = this.handleTimePicked.bind(this)
  }

  handleStartLocationPicked(startLocation) {
    const validity =  startLocation != undefined;
    this.setState({ startLocation: startLocation, inputValidity: !!validity });
  }

  handleDatePicked(date) {
    dateTimestamp = this.getDateTimestamp(date);
    now = new Date();
    const validity =  dateTimestamp + this.state.chosenTime >= now.getTime();
    this.setState({ chosenDate: dateTimestamp, inputValidity: !!validity });
    this.hideDatePicker();
  };

  showTimePicker() {
    this.setState({ isTimePickerVisible: true });
  };

  hideTimePicker() {
    this.setState({ isTimePickerVisible: false });
  };

  handleTimePicked(time) {
    timeTimestamp = this.getTimeTimestamp(time);
    now = new Date();
    const validity = this.state.chosenDate + timeTimestamp >= now.getTime();
    this.setState({ chosenTime: timeTimestamp, inputValidity: !!validity });
    this.hideTimePicker();
  };

  // HELPERS

  showDatePicker() {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker() {
    this.setState({ isDatePickerVisible: false });
  };

  getDateTimestamp(date) {
    // Offset into the day
    millisecondsOffset = date.getMilliseconds()
    secondsOffset = this.secondsToMilliseconds(date.getSeconds());
    minutesOffset = this.minutesToMilliseconds(date.getMinutes());
    hoursOffset = this.hoursToMilliseconds(date.getHours());
    offset = millisecondsOffset + secondsOffset + minutesOffset + hoursOffset;

    // Return start of the day timestamp
    return date.getTime() - offset;
  }

  getTimeTimestamp(time) {
    // Milliseconds since the start of the day
    milliseconds = time.getMilliseconds()
    seconds = this.secondsToMilliseconds(time.getSeconds());
    minutes = this.minutesToMilliseconds(time.getMinutes());
    hours = this.hoursToMilliseconds(time.getHours());
    return milliseconds + seconds + minutes + hours;
  }

  secondsToMilliseconds(seconds) {
    return seconds * 1000;
  }

  minutesToMilliseconds(minutes) {
    return minutes * 60 * 1000;
  }

  hoursToMilliseconds(hours) {
    return hours * 60 * 60 * 1000;
  }

  showTime(timeTimestamp) {
    hours = Math.floor(timeTimestamp / (60 * 60 * 1000));
    timeTimestamp -= this.hoursToMilliseconds(hours);
    minutes =  Math.floor(timeTimestamp / (60 * 1000));
    timeTimestamp -= this.minutesToMilliseconds(minutes);
    return hours.toString() + ":" + minutes.toString();
  }

  showDate(dateTimestamp) {
    date = new Date(dateTimestamp);
    year = date.getFullYear();
    month = date.getMonth() + 1;  // Months start at 0
    day = date.getDate();
    return day.toString() + "/" + month.toString() + "/" + year.toString();
  }

  // RENDERER

  render() {
    return (
      <Form style={styles.form}>
        <Item inlineLabel regular picker style={styles.item}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={styles.input}
            placeholder="Seleccionar punto de partida"
            placeholderStyle={styles.label}
            placeholderIconColor="#007aff"
            selectedValue={this.state.startLocation}
            onValueChange={this.handleStartLocationPicked}
          >
            {
              this.props.items.map(item => (
                <Picker.Item
                  key={item["id"]}
                  value={item["id"]}
                  label={item["name"]}
                />
              ))
            }
          </Picker>
          <Input
            editable={false}
            value={this.state.startLocation ? this.state.startLocation.toString() : undefined}
            isVisible={false}
          />
        </Item>
        <Item inlineLabel regular style={styles.item} onPress={this.showDatePicker}>
          <Label style={styles.label}>DÍA</Label>
          <Text style={styles.input}>{this.showDate(this.state.chosenDate)}</Text>
          <Input
            editable={false}
            value={this.showDate(this.state.chosenDate)}
            isVisible={false}
          />
          <DateTimePicker
            isDarkModeEnabled={colorScheme === 'dark'}
            isVisible={this.state.isDatePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDatePicker}
            date={new Date(this.state.chosenDate)}
            mode="date"
          />
        </Item>
        <Item inlineLabel last regular style={styles.item} onPress={this.showTimePicker}>
          <Label style={styles.label}>HORA</Label>
          <Text style={styles.input}>{this.showTime(this.state.chosenTime)}</Text>
          <Input
            editable={false}
            value={this.showTime(this.state.chosenTime)}
            isVisible={false}
          />
          <DateTimePicker
            isDarkModeEnabled={colorScheme === 'dark'}
            isVisible={this.state.isTimePickerVisible}
            onConfirm={this.handleTimePicked}
            onCancel={this.hideTimePicker}
            date={new Date(this.state.chosenDate + this.state.chosenTime)}
            mode="time"
          />
        </Item>
        <Button
          block
          borderRadius={10}
          style={styles.button}
          disabled={!this.state.inputValidity}
        >
          <Text>Buscar Viaje</Text>
        </Button>
      </Form>
    )
  }
}

FindTripForm.propTypes = {}

const styles = StyleSheet.create({
  form_element: {
    width: Layout.window.width * 0.85,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  form: {
    alignItems: 'center',
    height: 250,
    margin: 15,
  },
  input: {
    width: Layout.window.width * 0.85,
  },
  item: {
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    color: '#8c8c8c',
  },
})

export default FindTripForm
