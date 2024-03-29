import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { Icon, Spinner } from 'native-base'
import { Header } from 'react-navigation'
import Colors from '../constants/Colors'
import CardInput from '../components/CardInput'

import { normalizeText } from '../utils/normalizeText'

class SpotSelectorScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
    }
  }

  render() {
    const { navigation, spots } = this.props
    const { filter } = this.state
    const normalizedInput = normalizeText(filter)
    let data = navigation.getParam('data', spots)
    if (data && data.length === 0) {
      data = spots
    }

    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.lightBackground }}
        keyboardVerticalOffset={Header.HEIGHT + 16}
        behavior="padding"
      >
        <View>
          <CardInput
            placeholder="Filtra por Comuna o Parada"
            value={filter}
            text={navigation.getParam('text', '')}
            onChangeText={text => this.setState({ filter: text })}
            editable={true}
            onClearPress={() => this.setState({ filter: '' })}
          />
        </View>
        <View style={styles.container}>
          {data ? (
            <FlatList
              data={data.filter(
                item =>
                  normalizeText(item.name).includes(normalizedInput) ||
                  normalizeText(item.address).includes(normalizedInput)
              )}
              style={styles.flatList}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.getParam('onItemPress', '')(item)
                      navigation.goBack()
                    }}
                    style={{ flexDirection: 'row' }}
                  >
                    <Icon
                      active
                      name="navigate"
                      style={{ marginRight: 10, color: '#8698ab' }}
                    />
                    <View style={styles.itemText}>
                      <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                      <Text>{item.address}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id}
            />
          ) : (
            <Spinner color={'#0000FF'} />
          )}
        </View>
      </KeyboardAvoidingView>
    )
  }
}

SpotSelectorScreen.navigationOptions = ({ navigation }) => ({
  title:
    typeof navigation.state.params === undefined ||
    typeof navigation.state.params.title === undefined
      ? 'Selecciona un destino'
      : navigation.state.params.title,

  // headerStyle: { backgroundColor: color.theme },
})
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 15,
    marginRight: 10,
  },
  listItem: {
    borderBottomColor: '#8698ab',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    borderBottomWidth: 1,
    padding: 20,
  },
})

const mapStateToProps = ({ spots }) => {
  return {
    spots: spots.spots,
  }
}

export default connect(mapStateToProps)(SpotSelectorScreen)
