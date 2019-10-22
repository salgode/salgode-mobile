import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Button, Picker } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from '../CurrentTrip/StopsList'

const TripRequest = ({ stops = ['SJ', 'CC', 'MVP'], onSend }) => {
  // console.log(stops)
  const [state, setState] = React.useState({ selectedStop: stops[0] })

  return (
    <View style={styles.container}>
      <Text style={styles.stopsTitle}>Paradas:</Text>
      <StopsList stops={stops} />
      <Text style={styles.stopsTitle}>
        Selecciona la parada en la que te subirás
      </Text>
      <Picker
        selectedValue={state.selectedStop}
        onValueChange={value => setState({ selectedStop: value })}
        mode="dropdown"
        style={styles.picker}
      >
        {stops.map((stop, i) => (
          <Picker.Item key={`PickerItem${i}`} label={stop} value={stop} />
        ))}
      </Picker>
      <Button style={styles.button} onPress={() => onSend(state.selectedStop)}>
        <Text>Confirmar Solicitud</Text>
      </Button>
    </View>
  )
}

TripRequest.propTypes = {
  stops: PropTypes.array.isRequired,
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
    borderRadius: 15,
    borderWidth: 1,
  },
  stopsTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: '10%',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    marginBottom: '10%',
  },
})

export default TripRequest
