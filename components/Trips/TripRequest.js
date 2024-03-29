import React from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Button, Picker, Spinner } from 'native-base'
import PropTypes from 'prop-types'
import StopsList from '../CurrentTrip/StopsList'
import Colors from '../../constants/Colors'

const TripRequest = ({ stops, onSend, loading }) => {
  const [state, setState] = React.useState({
    selectedStop: 'Selecciona la parada',
    selected: false,
  })

  return (
    <View style={styles.container}>
      <Text style={styles.stopsTitle}>Paradas:</Text>
      <StopsList stops={stops} />
      <Text style={styles.pickerTitle}>
        Selecciona la parada en la que te subirás
      </Text>
      <Picker
        placeholder="Donde te subirás?"
        selectedValue={state.selectedStop}
        onValueChange={value =>
          setState({ selectedStop: value, selected: true })
        }
        mode="dropdown"
        style={styles.picker}
      >
        {stops.slice(0, -1).map((stop, i) => (
          <Picker.Item
            key={`PickerItem${i}`}
            label={stop.place_name}
            value={stop}
          />
        ))}
      </Picker>
      <Text style={styles.smallTitle}>
        Puedes bajar en cualquiera de estas paradas 🏁
      </Text>
      {loading && <Spinner color={Colors.mainBlue} />}
      {!loading && (
        <Button
          disabled={!state.selected}
          style={state.selected ? styles.button : styles.unselectedButton}
          onPress={() => onSend(state.selectedStop, stops[stops.length - 1])}
        >
          <Text>Confirmar Solicitud</Text>
        </Button>
      )}
    </View>
  )
}

TripRequest.propTypes = {
  stops: PropTypes.arrayOf(
    PropTypes.shape({
      place_name: PropTypes.string.isRequired,
    }).isRequired
  ),
  onSend: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    backgroundColor: Colors.mainBlue,
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
  pickerTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 5,
  },
  smallTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
  },
  stopsTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: '10%',
  },
  unselectedButton: {
    alignSelf: 'center',
    backgroundColor: Colors.mainGrey,
    borderRadius: 10,
    // height: '10%',
    justifyContent: 'center',
    marginTop: 20,
    width: '70%',
  },
})

export default TripRequest
