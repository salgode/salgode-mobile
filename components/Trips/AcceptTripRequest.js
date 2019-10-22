import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Text, Button, Card, CardItem, Thumbnail, View } from 'native-base'
import PropTypes from 'prop-types'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import TimeInfo from './Trip/TimeInfo'

export default function AcceptTripRequest({
  // requerido: Nombre mostrado en la notificación
  name = 'John Doe',
  // requerido: Mensaje de la notificación
  title = 'Aceptar solicitud de viaje',
  // requerido: Timestamp del viaje
  timestamp = Date.now(),
  // requerido: Inicio, Fin y Parada del viaje
  startLocation = 'Partida',
  endLocation = 'Destino',
  stopLocation = 'Parada 1',
  // opcional: Texto del botón
  buttonText = 'Contactar',
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
      <CardItem style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </CardItem>
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
        <View style={styles.locationsContainer}>
          <View style={styles.locationsBar}>
            <View style={styles.ball} />
            <View style={styles.bar} />
            <View style={styles.ball} />
          </View>
          <View style={styles.locations}>
            <Text>{startLocation}</Text>
            <Text>{endLocation}</Text>
          </View>
        </View>
      </CardItem>
      <CardItem>
        <MaterialIcons
          name="location-searching"
          size={30}
          color="red"
          style={styles.icon}
        />
        <Text>{stopLocation}</Text>
      </CardItem>
      <CardItem style={styles.timeContainer}>
        <TimeInfo timestamp={timestamp} isDate />
        <TimeInfo timestamp={timestamp} />
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

AcceptTripRequest.propTypes = {
  buttonText: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  startLocation: PropTypes.string.isRequired,
  endLocation: PropTypes.string.isRequired,
  stopLocation: PropTypes.string.isRequired,
  image_uri: PropTypes.string,
  positionAbsolute: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: '20%',
    zIndex: 99,
  },
  ball: {
    backgroundColor: Colors.textGray,
    borderRadius: 10,
    height: 20,
    width: 20,
  },
  bar: { backgroundColor: Colors.textGray, height: 40, width: 5 },
  button: {
    backgroundColor: '#866bfe',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 20,
    width: '60%',
  },
  buttonSection: {
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  container: {
    alignSelf: 'center',
    borderRadius: 10,
    width: '90%',
  },
  icon: {
    marginHorizontal: 10,
  },
  locations: { justifyContent: 'space-between' },
  locationsBar: { alignItems: 'center', marginHorizontal: 15 },
  locationsContainer: { flexDirection: 'row', width: '100%' },
  messageSection: {
    flex: 1,
  },
  name: {
    color: 'grey',
    fontSize: 18,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  timeContainer: { justifyContent: 'space-evenly', width: '100%' },
  titleContainer: { alignItems: 'center', width: '100%' },
  titleText: { fontSize: 24, textAlign: 'center', width: '100%' },
  upperSection: {
    flexDirection: 'row',
    flex: 2,
    width: '100%',
    justifyContent: 'center',
  },
})
