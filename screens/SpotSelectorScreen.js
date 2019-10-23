import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'

// import CardInputSelector from '../components/CardInputSelector'

class SpotSelectorScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <CardInputSelector
          text="#Desde"
          placeHolder="Filtra por Comuna o Parada"
          onSelect={() => {}}
          onClear={() => {}}
          data={[]}
          // editable={false}
          onPress={() => {}}
        /> */}
        {/* <ScrollView>
          <Text>Hola Wayo</Text>
        </ScrollView> */}
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

const mapStateToProps = ({ spots }) => {
  return {
    spots: spots.spots,
  }
}

export default connect(mapStateToProps)(SpotSelectorScreen)
