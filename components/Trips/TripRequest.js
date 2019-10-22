import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Button, Picker } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from '../CurrentTrip/StopsList'

const TripRequest = ({ stops, onSend }) => {
  console.log(stops)
  const [state, setState] = React.useState({
    selectedStop: 'Selecciona la parada en la que te subirás',
    selected: false,
  })

  return (
    <View style={styles.container}>
      <Text style={styles.stopsTitle}>Paradas:</Text>
      <StopsList stops={stops.map(s => s.address)} />
      <Picker
        placeholder="Selecciona la parada en la que te subirás"
        selectedValue={state.selectedStop}
        onValueChange={value =>
          setState({ selectedStop: value, selected: true })
        }
        mode="dropdown"
        style={styles.picker}
      >
        {stops.map((stop, i) => (
          <Picker.Item
            key={`PickerItem${i}`}
            label={stop.address}
            value={stop.address}
          />
        ))}
      </Picker>
      <Button
        disabled={!state.selected}
        style={state.selected ? styles.button : styles.unselectedButton}
        onPress={() => onSend(state.selectedStop)}
      >
        <Text>Confirmar Solicitud</Text>
      </Button>
    </View>
  )
}

TripRequest.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      address: PropTypes.string.isRequired,
    }).isRequired
  ),
  onSend: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: '#33C534',
    borderRadius: 10,
    // height: '10%',
    justifyContent: 'center',
    marginTop: 20,
    width: '70%',
  },
  container: {
    padding: '10%',
    ...StyleSheet.absoluteFillObject,
  },
  picker: {
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
  },
  stopsTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: '10%',
  },
  unselectedButton: {
    alignSelf: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
    // height: '10%',
    justifyContent: 'center',
    marginTop: 20,
    width: '70%',
  },
})

export default TripRequest
