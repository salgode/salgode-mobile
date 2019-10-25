import React, { Component } from 'react'
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { loginUser } from '../redux/actions/user'
import { createTrip } from '../redux/actions/createtrip'
import { Button, Icon } from 'native-base'
import { spotsFilter } from '../utils/spotsFilter'
import Colors from '../constants/Colors'
import CardInput from '../components/CardInput'

class AddStopsScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      stops: [],
      loading: false,
    }
  }

  cleanInput = index => {
    const newStops = this.state.stops.filter((stop, i) => {
      if (i !== index) {
        return true
      }
    })
    this.setState({ stops: newStops })
  }

  createTrip = async () => {
    this.setState({ loading: true })
    const { startStop, endStop, startTime, user } = this.props
    const { stops } = this.state
    const stops_ids = stops.map(stop => {
      return stop.id
    })

    const route_points = [startStop.id].concat(stops_ids, endStop.id)

    const response = await this.props.createTrip(
      route_points,
      startTime,
      user.userId,
      user.token
    )

    this.setState({ loading: false })
    if (response.error) {
      Alert.alert(
        'Error de creación',
        'Hubo un problema al crear tu viaje. Por favor intentalo de nuevo.'
      )
    } else {
      Alert.alert('Creación de exitosa', 'Tu viaje ha sido publicado!')
      this.props.navigation.popToTop()
    }
  }

  renderStops = () => {
    const { stops } = this.state
    return stops.map((stop, index) => {
      return (
        <View key={index} style={styles.textView}>
          <View
            style={{
              ...styles.stopContainer,
              justifyContent: 'flex-start',
              width: '85%',
            }}
          >
            <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
              #Parada {index + 1}{' '}
            </Text>
            <Text numberOfLines={1} style={{ width: '75%' }}>
              {stop.name}
            </Text>
          </View>
          <Button icon transparent onPress={() => this.cleanInput(index)}>
            <Icon name="close" />
          </Button>
        </View>
      )
    })
  }

  render() {
    const { startStop, endStop, navigation } = this.props
    const { stops } = this.state
    const filteredSpots = spotsFilter(this.props.spots, [
      startStop,
      endStop,
      ...stops,
    ])
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {this.state.loading && <ActivityIndicator />}
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
            <Text style={styles.centeredText}>
              Agrega paradas extra (opcional)
            </Text>
            {this.renderStops()}
            <CardInput
              onTouchablePress={() =>
                navigation.navigate('SpotSelectorScreen', {
                  title: 'Seleccionar #Parada',
                  text: '#Parada',
                  data: filteredSpots,
                  onItemPress: item =>
                    this.setState({ stops: stops.concat(item) }),
                })
              }
              placeholder="Filtra por Comuna o Parada"
              text="#Desde"
              editable={false}
            />
          </View>
        </ScrollView>

        <View>
          <Button block style={styles.addButton} onPress={this.createTrip}>
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
    backgroundColor: Colors.mainBlue,
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  centeredText: {
    marginLeft: 'auto',
    marginRight: 'auto',
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
AddStopsScreen.navigationOptions = {
  title: 'Añadir paradas',
  headerBackTitle: '', // TODO: que no diga 'Back'
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddStopsScreen)
