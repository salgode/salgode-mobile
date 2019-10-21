import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native'
import Layout from '../constants/Layout'
import PropTypes from 'prop-types'
import ChooseTrips from '../components/Trips/ChooseTrips'

class ChooseTripsScreen extends Component {
  static navigationOptions = {
    title: 'Pedir Viaje',
  }

  constructor(props) {
    super(props)
    this.state = {
      avalibleTrips: null,
      rerender: true,
    }

    this.onSend = this.onSend.bind(this)
  }

  onSend() {
    //fetch to POST new passanger in trip
  }

  getTrips() {
    //fetch to GET actual trips to show in screen
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Busca tu viaje</Text>
        <View>
          <ChooseTrips
            onSend={this.state.onSend}
            trips={[
              {
                timestamp: 1571633513000,
                spacesUsed: 3,
                key: '0',
                user: {
                  name: 'Thomas Brahm',
                  reputation: 10,
                },
                startPoint: 'Metro San Joaquín',
                endPoint: 'Estadio Banco Central'
              },
              {
                timestamp: 1571503602000,
                spacesUsed: 3,
                key: '1',
                user: {
                  name: 'Daniel Leal',
                  reputation: 7,
                },
                startPoint: 'Metro San Joaquín',
                endPoint: 'Universo Chino'
              },
              {
                timestamp: 1571586402000,
                spacesUsed: 3,
                key: '2',
                user: {
                  name: 'Example User',
                  reputation: 8,
                },
                startPoint: 'Metro San Joaquín',
                endPoint: 'Costanera Center'
              },
              {
                timestamp: 1570985202000,
                spacesUsed: 3,
                key: '3',
                user: {
                  name: 'John Doe',
                  reputation: 3,
                },
                startPoint: 'Metro San Joaquín',
                endPoint: 'Universidad Alberto Hurtado'
              },
              {
                timestamp: 1571593602000,
                spacesUsed: 3,
                key: '4',
                user: {
                  name: 'Alexander Rovint',
                  reputation: 9,
                },
                startPoint: 'Metro San Joaquín',
                endPoint: 'Parroquia Nuestra Señora de la Medalla Milagrosa'
              },
              {
                timestamp: 1571676402000,
                spacesUsed: 3,
                key: '5',
                user: {
                  name: 'Mike Hansen',
                  reputation: 1,
                },
                startPoint: 'Metro San Joaquín',
                endPoint: 'Mall VIVO El Centro'
              },
            ]}
          />
        </View>
      </View>
    )
  }
}

ChooseTripsScreen.propTypes = {
  isRequestedTrips: PropTypes.bool,
}

ChooseTripsScreen.defaultProps = {
  isRequestedTrips: false,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f7fc',
    padding: 15,
    paddingBottom: 90,
    ...StyleSheet.absoluteFill,
  },
  title: {
    color: '#3b3e43',
    padding: 15,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '900',
  },
})

export default ChooseTripsScreen
