import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, Button } from 'native-base'
import PropTypes from 'prop-types'

const PedirBoton = () => {
  return (
    <Button borderRadius={10} style={styles.button}>
      <Text>Pedir Viaje</Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 5,
  },
})

export default PedirBoton
