import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card } from 'native-base'

export default function CardInput(props) {
  return (
    <Card style={styles.paper}>
      <View style={styles.Container}>
        <View style={styles.rowView}>
          <View style={styles.textView}>
            <Text style={styles.text}>{props.text}</Text>
          </View>
          <View style={styles.input}>{props.input}</View>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  input: { alignItems: 'flex-end', flex: 0.5 },
  paper: { borderRadius: 10 },
  rowView: { alignItems: 'center', flexDirection: 'row' },
  text: { fontWeight: 'bold' },
  textView: { flex: 0.5, marginLeft: 10 },
})
