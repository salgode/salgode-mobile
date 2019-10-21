import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { createTrip } from '../redux/actions/createtrip'
import { Button, Icon } from 'native-base'
import CardInputSelector from '../components/CardInputSelector'

class AddStopsScreen extends Component {
  state = {
    stops: [],
  }

  cleanInput = index => {
    const newStops = this.state.stops.filter((stop, i) => {
      if (i !== index) {
        return true
      }
    })
    this.setState({ stops: newStops })
  }

  createTrip = () => {
    const { startStop, endStop, startTime } = this.props
    const { stops } = this.state
    const route_points = [startStop.id, endStop.id]
    console.log(startTime)
    console.log(startTime.getDay())
    const day = 'Lunes'
    const hour = '16:15'
    this.props.createTrip(route_points, day, hour)
  }

  renderStops = () => {
    const { stops } = this.state
    return stops.map((stop, index) => {
      return (
        <View key={index} style={styles.textView}>
          <View
            style={{ ...styles.stopContainer, justifyContent: 'space-evenly' }}
          >
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              #Parada {index + 1}{' '}
            </Text>
            <Text>{stop.name}</Text>
          </View>
          <Button icon transparen onPress={() => this.cleanInput(index)}>
            <Icon name="close" />
          </Button>
        </View>
      )
    })
  }

  render() {
    const { startStop, endStop } = this.props
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.group}>
            <View style={styles.stopContainer}>
              <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                #Desde{' '}
              </Text>
              <Text>{startStop.name}</Text>
            </View>
            <View style={styles.stopContainer}>
              <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                #Hasta{' '}
              </Text>
              <Text>{endStop.name}</Text>
            </View>
          </View>
          <View style={styles.group}>
            {this.renderStops()}
            <CardInputSelector
              text="+"
              placeHolder="Filtra por Comuna o Parada"
              setValue={false}
              onSelect={item =>
                this.setState({ stops: this.state.stops.concat([item]) })
              }
            />
          </View>
        </ScrollView>

        <View>
          <Button block style={styles.addButton} onPress={this.createTrip}>
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
  stopContainer: {
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
  },
  textView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
})

const mapStateToProps = ({ user, createTrip, spots }) => {
  return {
    user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
    startTime: createTrip.startTime,
    spots: spots.spots,
  }
}

const mapDispatchToProps = {
  loginUser,
  createTrip,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
