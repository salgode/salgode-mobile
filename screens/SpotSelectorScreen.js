import React, { Component } from 'react'
import {
  ScrollView,
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

class SpotSelectorScreen extends Component {
  state = {
    filter: '',
  }
  render() {
    const { navigation } = this.props
    const { filter } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: Colors.lightBackground }}>
        <View>
          <CardInput
            placeholder="Filtra por Comuna o Parada"
            value={filter}
            text={navigation.getParam('text', '')}
            onChangeText={text => this.setState({ filter: text })}
            editable={true}
            onClearPress={navigation.getParam('onClearPress', () => {})}
          />
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.props.spots}
            style={styles.flatList}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{ flexDirection: 'row' }}
                >
                  <Icon
                    active
                    name="navigate"
                    style={{ marginRight: 10, color: '#8698ab' }}
                  />
                  <Text style={styles.itemText}>
                    {item.name}, {item.address}
                  </Text>
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
