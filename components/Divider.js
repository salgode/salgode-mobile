import React from 'react'
import { View } from 'native-base'

export default function Divider() {
  return (
    <View
      style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginLeft: '5%',
        marginRight: '5%',
      }}
    />
  )
}
