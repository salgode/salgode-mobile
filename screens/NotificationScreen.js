import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import NotificationCard from '../components/notification/card'

export default class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>#Llego en</Text>
        <NotificationCard
          positionAbsolute={false}
          name={'Johny Doe'}
          message={'Comenzó su viaje!'}
          onPress={() => console.log('Notification button pressed')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 50,
    fontWeight: '900',
    paddingHorizontal: '10%',
    paddingVertical: '20%',
  },
})
