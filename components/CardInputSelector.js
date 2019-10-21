import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { Card } from 'native-base'

export default class CardInputSelector extends Component {
  static defaultProps = {
    data: [
      { comuna: 'Lo Espejo', parada: 'Municipalidad' },
      { comuna: 'Lo Espejo', parada: 'Colegio Salvador' },
      { comuna: 'Lo Espejo', parada: 'Metro' },
      { comuna: 'Santiago', parada: 'Metro Santiago' },
    ],
    placeHolder: '',
    onPress: () => {},
    fields: [],
    text: '',
  }

  state = {
    displayList: false,
    input: '',
  }
  renderList = () => {
    const { displayList } = this.state
    if (displayList) {
      console.log('ricci la chupa')
    }
  }

  render() {
    return (
      <Card style={styles.paper}>
        <View style={styles.textView}>
          <Text style={styles.text}>{this.props.text}</Text>
          <TextInput
            placeholder="Hola"
            onFocus={() => this.setState({ displayList: true })}
          />
          {this.renderList()}
        </View>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  input: { alignItems: 'flex-end', flex: 0.5 },
  paper: { borderRadius: 10 },
  rowView: { alignItems: 'center', flexDirection: 'row' },
  text: { fontWeight: 'bold' },
  textView: { flex: 0.5, marginLeft: 10, flexDirection: 'column'},
  columnViews: { alignItems: 'center', flexDirection: 'column' },
})
