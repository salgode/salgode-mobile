import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Card, Button, Icon } from 'native-base'
import { normalizeText } from '../utils/normalizeText'

export default class CardInputSelector extends Component {
  constructor(props) {
    super(props)
    // this.textInputRef = React.createRef()
  }
  static defaultProps = {
    data: [],
    placeHolder: '',
    onSelect: () => {},
    onClear: () => {},
    onPress: () => {},
    fields: [],
    text: '',
    setValue: true,
    textInputRef: null,
    editable: true,
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
      const normalizedInput = normalizeText(input)

      const filteredData = this.props.data.filter(item => {
        return (
          normalizeText(item.name).includes(normalizedInput) ||
          normalizeText(item.address).includes(normalizedInput)
        )
      })
      return (
        <View style={{ height: 300 }}>
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => this.onItemPress(item)}
                style={styles.listItem}
              >
                <Text>
                  {item.name}, {item.address}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      )
    }
  }

  render() {
    const { placeHolder, editable } = this.props
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View>
          <Card style={styles.paper}>
            <View style={styles.textView}>
              <Text style={styles.text}>{this.props.text}</Text>
              <TextInput
                // ref={this.textInputRef}
                id="selectorInput"
                placeholder={placeHolder}
                value={this.state.input}
                editable={editable}
                // onFocus={this.props.onPress}
                onChangeText={text => this.setState({ input: text })}
              />

              <Button icon transparent onPress={this.cleanInput}>
                <Icon name="close" color="#0000FF" />
              </Button>
            </View>
          </Card>
          {/* <Card style={(styles.paper, styles.textView)}>
            {this.renderList()}
          </Card> */}
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
  paper: {
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    margin: 10,
  },
  textView: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
})
