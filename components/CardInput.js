import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { Button, Icon } from 'native-base'
import Colors from '../constants/Colors'

export default function CardInput(props) {
  const {
    onTouchablePress,
    value,
    editable,
    onClearPress,
    placeholder,
    text,
    onChangeText,
  } = props
  return (
    <TouchableOpacity
      onPress={onTouchablePress}
      style={styles.touchableContainer}
    >
      <Text style={styles.text}>{text}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        editable={editable}
        onChangeText={onChangeText}
        style={{ flex: 0.7, fontSize: 17 }}
      />

      <Button icon transparent onPress={onClearPress} style={{ flex: 0.2 }}>
        <Icon name="close" color="#0000FF" />
      </Button>
    </TouchableOpacity>
  )
}

CardInput.defaultProps = {
  onTouchablePress: () => {},
  value: '',
  editable: true,
  onClearPress: () => {
    this.props.value = ''
  },
  text: '',
  onChangeText: () => {},
}

const styles = StyleSheet.create({
  text: {
    flex: 0.2,
    fontSize: 17,
    fontWeight: 'bold',
    margin: 10,
  },
  touchableContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
})
