import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'

class SpotSelectorScreen extends Component {
  render() {
    return (
      <ScrollView>
        <Text>Hola Wayo</Text>
      </ScrollView>
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
export default SpotSelectorScreen
