import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import CardInputSelector from '../components/CardInputSelector'

class SpotSelectorScreen extends Component {
  render() {
    return (
      <View>
        <CardInputSelector
          text="#Desde"
          placeHolder="Filtra por Comuna o Parada"
          onSelect={() => {}}
          onClear={() => {}}
          data={[]}
          editable={false}
          onPress={() => {}}
        />
        <ScrollView>
          <Text>Hola Wayo</Text>
        </ScrollView>
      </View>
    )
  }
}

SpotSelectorScreen.navigationOptions = {
  header: null,
}

export default SpotSelectorScreen
