import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { Picker, DatePicker, Button } from 'native-base'
import CardInput from '../components/CardInput'
import CardInputSelector from '../components/CardInputSelector'
import { setStartStop, setEndStop, setStops } from '../redux/actions/createtrip'

class CreateTripScreen extends Component {
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
              text="#Desde"
              onSelect={this.props.setStartStop}
            />

            <CardInputSelector text="#A" onSelect={this.props.setEndStop} />
          </View>

          <View style={styles.group}>
            <CardInput
              text="Día"
              input={
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  locale={'es'}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={{ color: 'green' }}
                  placeHolderTextStyle={{ color: '#d3d3d3' }}
                  //   onDateChange={this.setDate}
                  disabled={false}
                />
              }
            />

            <CardInput
              text="Hora"
              input={
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  locale={'es'}
                  modalTransparent={false}
                  animationType={'fade'}
                  androidMode={'default'}
                  placeHolderText="Select date"
                  textStyle={{ color: 'green' }}
                  placeHolderTextStyle={{ color: '#d3d3d3' }}
                  //   onDateChange={this.setDate}
                  disabled={false}
                />
              }
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
