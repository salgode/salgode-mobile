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

SpotSelectorScreen.navigationOptions = {
  header: null,
}

export default SpotSelectorScreen
