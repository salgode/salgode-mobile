import React from 'react'
import { StyleSheet, Modal } from 'react-native'
import { CheckBox, ListItem, Text, View } from 'native-base'
import { withNavigation } from 'react-navigation'

const Legal = ({ termsChecked, setTermsChecked, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CheckBox
          checked={termsChecked}
          onPress={setTermsChecked}
          color="blue"
        />
      </View>
      <View style={{ flex: 5, flexWrap: 'wrap', textAlign: 'flex-start' }}>
        <Text>
          <Text> Acepto los </Text>
          <Text
            style={{ color: 'blue', flexWrap: 'wrap' }}
            onPress={() => {
              navigation.navigate('Terms')
            }}
          >
            términos y condiciones de uso
          </Text>
          <Text> y la </Text>
          <Text
            style={{ color: 'blue', flexWrap: 'wrap' }}
            onPress={() => {
              navigation.navigate('Privacy')
            }}
          >
            política de privacidad
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    width: '100%',
  },
})

export default withNavigation(Legal)
