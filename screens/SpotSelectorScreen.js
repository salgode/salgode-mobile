import React, { Component } from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'native-base'

import Colors from '../constants/Colors'
import CardInput from '../components/CardInput'

import { normalizeText } from '../utils/normalizeText'

class SpotSelectorScreen extends Component {
  state = {
    filter: '',
  }
  render() {
    const { navigation, spots } = this.props
    const { filter } = this.state
    const normalizedInput = normalizeText(filter)
    // console.log('Spots1:', spots[0])
    const data = navigation.getParam('data', spots)
    // console.log(data)
    const filteredData = data.filter(
      item =>
        normalizeText(item.name).includes(normalizedInput) ||
        normalizeText(item.address).includes(normalizedInput)
    )
    return (
      <View style={{ flex: 1, backgroundColor: Colors.lightBackground }}>
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
          <FlatList
            data={filteredData}
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
        </View>
      </View>
    )
  }
}

SpotSelectorScreen.navigationOptions = ({ navigation }) => ({
  title:
    typeof navigation.state.params === 'undefined' ||
    typeof navigation.state.params.title === 'undefined'
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