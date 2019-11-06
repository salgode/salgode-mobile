import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { View, Text } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import Colors from '../../constants/Colors'
import { Linking } from 'react-native'

const UserToPickUp = ({ name, location, phone }) => {
  console.log('dasdas')
  return (
    <View style={styles.container}>
      <Ionicons
        name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
        size={60}
      />
      <View style={styles.textContainer}>
        <Text style={styles.userText}>{name}</Text>
        <Text style={styles.locationText}>{location}</Text>
        <Text
          style={{ color: 'blue' }}
          onPress={() => Linking.openURL(`tel:${phone}`)}
        >
          {phone}
        </Text>
      </View>
    </View>
  )
}

UserToPickUp.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row' },
  locationText: {
    color: Colors.textGray,
  },
  textContainer: {
    marginLeft: '10%',
  },
  userText: {
    fontSize: 20,
    fontWeight: '300',
  },
})

export default UserToPickUp
