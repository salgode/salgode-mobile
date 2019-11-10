import React from 'react'
import { StyleSheet, Modal } from 'react-native'
import { CheckBox, ListItem, Text, View } from 'native-base'
import { WebView } from 'react-native-webview'

const Legal = ({ termsChecked, setTermsChecked }) => {
  const [modalActive, setModalActive] = React.useState(false)

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CheckBox
          checked={termsChecked}
          onPress={setTermsChecked}
          color="blue"
        />
      </View>
      <View style={{ flex: 5 }}>
        <Text style={{ textAlign: 'center' }} onPress={() => setModalActive(true)}>
          Acepto los términos y condiciones de uso
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        presentationStyle="fullScreen"
        visible={modalActive}
        onRequestClose={() => setModalActive(false)}
      >
        <WebView source={{ uri: 'https://salgode.cl/terminos' }}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
})

export default Legal
