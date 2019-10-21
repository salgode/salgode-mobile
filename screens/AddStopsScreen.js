import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { Picker, DatePicker, Button } from 'native-base'
import CardInput from '../components/CardInput'

class AddStopsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.group}>
            <CardInput
              text="#Agrega Paradas"
              input={
                <Picker selectedValue="java" mode="dropdown">
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              }
            />

            <CardInput
              text="#A"
              input={
                <Picker selectedValue="java" mode="dropdown">
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              }
            />
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
            onPress={() => console.log('')}
          >
            <Text>Crear Viaje</Text>
          </Button>
        </View>
      </View>
    )
  }
}

AddStopsScreen.navigationOptions = {
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
