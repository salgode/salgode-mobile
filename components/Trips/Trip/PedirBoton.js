import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button } from 'native-base'
import PropTypes from 'prop-types'

const PedirBoton = ({ onSend }) => {
  return (
    <Button borderRadius={10} style={styles.button} onPress={onSend}>
      <Text>Solicitar Viaje</Text>
    </Button>
  )
}

PedirBoton.propTypes = {
  onSend: PropTypes.func,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#886afe',
    borderRadius: 12,
    position: 'absolute',
    right: 5,
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
})

export default PedirBoton
