import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button } from 'native-base'
import PropTypes from 'prop-types'

const PedirBoton = ({ text = 'Solicitar Viaje', onSend }) => {
  return (
    <Button borderRadius={10} style={styles.button} onPress={onSend}>
      <Text>{text}</Text>
    </Button>
  )
}

PedirBoton.propTypes = {
  onSend: PropTypes.func,
  text: PropTypes.string,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#886afe',
    borderRadius: 12,
    elevation: 1,
    position: 'absolute',
    right: 5,
    shadowColor: '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
})

export default PedirBoton
