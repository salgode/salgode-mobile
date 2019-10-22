import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { Card, Button, Icon } from 'native-base'

export default class CardInputSelector extends Component {
  constructor(props) {
    super(props)
    this.textInputRef = React.createRef()
  }
  static defaultProps = {
    data: [],
    placeHolder: '',
    onSelect: () => {},
    onClear: () => {},
    fields: [],
    text: '',
    setValue: true,
    textInputRef: null,
  }

  state = {
    displayList: false,
    input: '',
  }

  onItemPress = item => {
    const { setValue } = this.props
    if (setValue) {
      this.setState({ input: item.name })
    } else {
      this.setState({ input: '' })
    }
    this.setState({ displayList: false })
    this.props.onSelect(item)
  }

  cleanInput = () => {
    this.setState({ input: '' })
    this.props.onClear()
  }

  renderList = () => {
    const { displayList, input } = this.state
    if (displayList) {
      return (
        <View style={{ flex: 1 }}>
          {this.props.data.map((item, index) => {
            if (
              item.name.toLowerCase().includes(input) ||
              item.address.toLowerCase().includes(input)
            ) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.onItemPress(item)}
                  style={styles.listItem}
                >
                  <Text>
                    {item.name}, {item.address}
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
    const { placeHolder } = this.props
    return (
      <TouchableOpacity onPress={() => this.textInputRef.current.focus()}>
        <View>
          <Card style={styles.paper}>
            <View style={styles.textView}>
              <Text style={styles.text}>{this.props.text}</Text>
              <TextInput
                ref={this.textInputRef}
                id="selectorInput"
                placeholder={placeHolder}
                value={this.state.input}
                onChangeText={text =>
                  this.setState({ input: text.toLowerCase() })
                }
                onFocus={() => this.setState({ displayList: true })}
              />

              <Button icon transparent onPress={this.cleanInput}>
                <Icon name="close" color="#0000FF" />
              </Button>
            </View>
          </Card>
          <Card style={(styles.paper, styles.textView)}>
            {this.renderList()}
          </Card>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    borderColor: '#818E94',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 1,
    padding: 10,
  },
  paper: { borderRadius: 10 },
  text: { fontWeight: 'bold', margin: 10 },
  textView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
})
