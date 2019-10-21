import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
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
    onSelect: () => {},
    fields: [],
    text: '',
  }

  state = {
    displayList: false,
    input: '',
  }

  onItemPress = item => {
    this.setState({ displayList: false, input: item.parada })
    this.props.onSelect(item)
  }

  renderList = () => {
    const { displayList, input } = this.state
    if (displayList) {
      return (
        <View>
          {this.props.data.map((item, index) => {
            if (
              item.parada.toLowerCase().includes(input) ||
              item.comuna.toLowerCase().includes(input)
            ) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.onItemPress(item)}
                >
                  <Text>
                    {item.parada}, {item.comuna}
                  </Text>
                </TouchableOpacity>
              )
            }
          })}
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        <Card style={styles.paper}>
          <View style={styles.textView}>
            <Text style={styles.text}>{this.props.text}</Text>
            <TextInput
              placeholder="Hola"
              value={this.state.input}
              onChangeText={text =>
                this.setState({ input: text.toLowerCase() })
              }
              onFocus={() => this.setState({ displayList: true })}
            />
          </View>
        </Card>
        <Card style={(styles.paper, styles.textView)}>{this.renderList()}</Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  columnViews: { alignItems: 'center', flexDirection: 'column' },
  input: { alignItems: 'flex-end', flex: 0.5 },
  paper: { borderRadius: 10 },
  rowView: { alignItems: 'center', flexDirection: 'row' },
  text: { fontWeight: 'bold' },
  textView: { flex: 0.5, flexDirection: 'column', marginLeft: 10 },
})
