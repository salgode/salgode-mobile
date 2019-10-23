import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button } from 'native-base'
import PropTypes from 'prop-types'

const PedirBoton = ({ text = 'Solicitar Viaje', onSend, disabled = false }) => {
  return (
    <Button
      borderRadius={10}
      style={styles.button}
      onPress={onSend}
      disabled={disabled}
    >
      <Text>{text}</Text>
    </Button>
  )
}

PedirBoton.propTypes = {
  onSend: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0000FF',
    borderRadius: 10,
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
