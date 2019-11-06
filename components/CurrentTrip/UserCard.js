import React from 'react'
import { Platform, StyleSheet, Linking } from 'react-native'
import { View, Text, Card, CardItem, Thumbnail } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

const dialCall = (phoneNumber) => {
  if (phoneNumber) {
    let link = ''
    if (Platform.OS === 'android') {
      link = `tel:${phoneNumber}`
    } else {
      link = `telprompt:${phoneNumber}`
    }
    Linking.openURL(link)
  }
}

const UserCard = ({ avatar, name, phone }) => (
  <Card>
    <CardItem style={styles.container}>
      <View style={styles.avatar}>
        {avatar ? (
          <Thumbnail source={{ uri: avatar }} />
        ) : (
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
            size={60}
          />
        )}
      </View>
      <Text style={styles.name}>{name}</Text>
      <Ionicons
        style={styles.call}
        name={Platform.OS === 'ios' ? 'ios-call' : 'md-call'}
        color="green"
        size={50}
        onPress={() => dialCall(phone)}
      />
    </CardItem>
  </Card>
)

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    flex: 3,
    marginLeft: 10,
  },
  call: {
    flex: 1,
  },
})

export default UserCard
