import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import Select from 'react-select';
import { Card } from 'native-base'

export default function CardInput(props) {
  return (
    <Card style={styles.paper}>
      <View style={styles.Container}>
        <View style={styles.rowView}>
          <View style={styles.textView}>
            <Text style={styles.text}>{props.text}</Text>
            <TextInput>
                
            </TextInput>
          </View>
          <View style={styles.input}>{props.input}</View>
        </View>
      </View>
    </Card>
  )
}

export default class CardInputSelector extends Component {
  static defaultProps = {
    data: [],
    placeHolder: '',
    onPress: () => {},
    fields: [],
    input: '',
  };

  render() {
    return ()
  }
}

const styles = StyleSheet.create({
  input: { alignItems: 'flex-end', flex: 0.5 },
  paper: { borderRadius: 10 },
  rowView: { alignItems: 'center', flexDirection: 'row' },
  text: { fontWeight: 'bold' },
  textView: { flex: 0.5, marginLeft: 10 },
})
