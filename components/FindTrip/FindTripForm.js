import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Appearance } from 'react-native-appearance';
import { Text, Form, Item, Input, Label, Button, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
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
          <Icon name="rightcircle" style={styles.icon} color={'#fd5844'} />
          <Label style={styles.label}>De</Label>
          <Picker
            mode="dropdown"
            style={styles.picker}
            placeholder="Punto de partida"
            placeholderIconColor="#007aff"
            textStyle={styles.rightAlign}
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
            style={styles.invisible}
            editable={false}
            value={this.state.startLocation ? this.state.startLocation.toString() : undefined}
            isVisible={false}
          />
        </Item>
        <Item inlineLabel regular style={styles.item} onPress={this.showDatePicker}>
          <Icon name="calendar" style={styles.icon} />
          <Label style={styles.label}>Día</Label>
          <Text style={styles.rightAlign}>{this.showDate(this.state.chosenDate)}</Text>
          <Input
            style={styles.invisible}
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
        <Item inlineLabel regular style={styles.item} onPress={this.showTimePicker}>
          <Icon name="clockcircleo" style={styles.icon} />
          <Label style={styles.label}>Hora</Label>
          <Text style={styles.rightAlign}>{this.showTime(this.state.chosenTime)}</Text>
          <Input
            style={styles.invisible}
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
          style={!!this.state.inputValidity ? styles.button : styles.disabledButton}
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
  form: {
    alignItems: 'center',
    height: 250,
    margin: 15,
  },
  item: {
    borderRadius: 12,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50,
    width: Layout.window.width * 0.85,
  },
  disabledButton: {
    borderRadius: 12,
    marginTop: 130,
  },
  button: {
    backgroundColor: '#886afe',
    borderRadius: 12,
    marginTop: 130,
  },
  label: {
    color: '#333333',
  },
  icon: {
    fontSize: 25,
    paddingLeft: 5,
    paddingRight: 10,
    // Correct icons white space
    marginBottom: -3,
  },
  invisible: {
    display: 'none',
  },
  rightAlign: {
    color: '#8c8c8c',
    position: 'absolute',
    right: 10,
  },
  picker: {
    width: (Layout.window.width * 0.85) - 77,
  },
})

export default FindTripForm
