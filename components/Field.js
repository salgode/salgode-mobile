import React from 'react'
import { StyleSheet } from 'react-native'
import { Item, Label, Input, Icon } from 'native-base'

import Layout from '../constants/Layout'

const Field = ({ field }) => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [hasBeenBlurred, setHasBeenBlurred] = React.useState(false)

  const validity = field.validate(field.value)
    ? 'valid'
    : isEditing
    ? 'partial'
    : hasBeenBlurred
    ? 'invalid'
    : 'partial'

  return (
    <Item
      key={field.label}
      inlineLabel
      regular
      style={{
        ...styles.item,
        backgroundColor:
          field.editable !== undefined && !field.editable ? '#C0C0C0' : '#FFF',
      }}
      success={validity === 'valid'}
      error={validity === 'invalid'}
    >
      <Label style={styles.label}>{field.label}</Label>
      <Input
        style={styles.input}
        onChangeText={value => {
          field.setValue(value)
          setIsEditing(true)
        }}
        onEndEditing={() => {
          setIsEditing(false)
          setHasBeenBlurred(true)
        }}
        value={field.value}
        placeholder={field.placeholder}
        secureTextEntry={field.isSecure}
        keyboardType={field.keyboardType || 'default'}
        maxLength={field.maxLength ? field.maxLength(field.value) : undefined}
        editable={field.editable}
      />
      {validity === 'valid' ? (
        <Icon name="checkmark-circle" style={styles.checkMark} />
      ) : validity === 'invalid' ? (
        <Icon name="close-circle" />
      ) : null}
    </Item>
  )
}

const styles = StyleSheet.create({
  checkMark: {
    color: '#33C534',
  },
  input: {
    fontSize: 14,
    height: 40,
    width: Layout.window.width * 0.85,
  },
  item: {
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  label: {
    color: '#8c8c8c',
    fontSize: 14,
  },
})

export default Field
