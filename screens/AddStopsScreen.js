import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { Button, Icon } from 'native-base'
import CardInputSelector from '../components/CardInputSelector'
import { AuthSession } from 'expo'

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
            <Text>{stop.parada}</Text>
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
              <Text>{startStop}</Text>
            </View>
            <View style={styles.stopContainer}>
              <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                #Hasta{' '}
              </Text>
              <Text>{endStop}</Text>
            </View>
          </View>
          <View style={styles.group}>
            <Text style={styles.centeredText}>
              Agrega paradas extra (opcional)
            </Text>
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
          <Button
            block
            style={styles.addButton}
            onPress={() => console.log('')}
          >
            <Text style={styles.whiteText}>Crear Viaje</Text>
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
    backgroundColor: '#33C534',
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  centeredText:{
    marginRight: 'auto',
    marginLeft: 'auto',
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
  whiteText: {
    color: 'white',
  },
})

const mapStateToProps = ({ user, createTrip }) => {
  return {
    user,
    startStop: createTrip.startStop,
    endStop: createTrip.endStop,
  }
}

const mapDispatchToProps = {
  loginUser,
}
AddStopsScreen.navigationOptions = {
  title: 'Añadir paradas',
  headerBackTitle: '', // TODO: que no diga 'Back'
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
