import React from 'react'
import { StyleSheet } from 'react-native'
import { Card, CardItem, View, Text, Button } from 'native-base'
import PropTypes from 'prop-types'
import { urls } from '../../config/api/index'
import { client } from '../../redux/store'

const FinishedTrip = ({
  // requerido: Nombre mostrado en la notificación
  location,
  // opcional: Mensaje de la notificación
  message = 'Ha finalizado tu recorrido.',
  // opcional: Mensaje de la notificación
  thankYouMessage = 'Muchas gracias de parte de tus pasajeros!',
  // opcional: Texto del botón
  buttonText = 'Terminar Viaje',
  // opcional: La tarjeta se muestra encima con posición absoluta
  positionAbsolute = false,
  // requerido: función que se ejecuta con el botón
  onPress = () => console.warn('Notification button pressed'),
  // requerido: id del Viaje
  tripId,
  // requerido: token del usuario
  token,
}) => {
  return (
    <Card
      style={{
        ...styles.container,
        ...(positionAbsolute && styles.absolute),
      }}
    >
      <CardItem style={styles.upperSection}>
        <View style={styles.icon} />
        <Text style={styles.name}>{location}</Text>
      </CardItem>
      <CardItem style={styles.messageSection}>
        <Text style={styles.message}>{message}</Text>
      </CardItem>
      <CardItem style={styles.messageSection}>
        <Text>{thankYouMessage}</Text>
      </CardItem>
      <CardItem style={styles.buttonSection}>
        <Button style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText} uppercase={false}>
            {buttonText}
          </Text>
        </Button>
      </CardItem>
    </Card>
  )
}

FinishedTrip.propTypes = {
  location: PropTypes.string.isRequired,
  message: PropTypes.string,
  thankYouMessage: PropTypes.string,
  buttonText: PropTypes.string,
  positionAbsolute: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  tripId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: '30%',
    zIndex: 99,
  },
  button: {
    backgroundColor: '#866bfe',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
    width: '60%',
  },
  buttonSection: {
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    height: 300,
    width: '90%',
  },
  icon: {
    backgroundColor: '#9536F7',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  message: {
    fontSize: 24,
    fontWeight: '700',
  },
  messageSection: {
    flex: 1,
  },
  name: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  upperSection: {
    flexDirection: 'row',
    flex: 2,
    width: '100%',
    justifyContent: 'center',
  },
})

export default FinishedTrip
