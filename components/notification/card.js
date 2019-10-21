import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text, Button, Card, CardItem, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import { Ionicons } from '@expo/vector-icons'

export default function NotificationCard({
  // requerido: Nombre mostrado en la notificación
  name = 'John Doe',
  // requerido: Mensaje de la notificación
  message = 'Comenzó su viaje!',
  // opcional: Texto del botón
  buttonText = 'Ok!',
  // opcional: URL de la imagen de la persona, por defecto se usa un icono
  image_uri = undefined,
  // opcional: La tarjeta se muestra encima con posición absoluta
  positionAbsolute = true,
  // requerido: función que se ejecuta con el botón
  onPress = () => console.log('Notification button pressed'),
}) {
  return (
    <Card
      style={{
        ...styles.container,
        ...(positionAbsolute && styles.absolute),
      }}
    >
      <CardItem style={styles.upperSection}>
        {image_uri ? (
          <Thumbnail source={{ uri: image_uri }} />
        ) : (
          <Ionicons
            color={'grey'}
            name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-contact`}
            size={80}
            style={styles.icon}
          />
        )}
        <Text style={styles.name}>{name}</Text>
      </CardItem>
      <CardItem style={styles.messageSection}>
        <Text style={styles.message}>{message}</Text>
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

NotificationCard.propTypes = {
  buttonText: PropTypes.string,
  message: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image_uri: PropTypes.string,
  positionAbsolute: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
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
    marginHorizontal: 10,
  },
  message: {
    fontSize: 32,
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
