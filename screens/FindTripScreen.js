import React, { Component } from 'react'
import Layout from '../constants/Layout'
import { Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import FindTripForm from '../components/FindTrip/FindTripForm'

class FindTripScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
        <Text style={styles.title}>#SalgoDe</Text>
        <FindTripForm items={items} />
      </KeyboardAvoidingView>
    )
  }
}

FindTripScreen.propTypes = {}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#f4f7fc',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingTop: 100,
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    color: '#3b3e43',
    fontSize: 35,
    fontWeight: '900',
    textAlign: 'left',
    width: Layout.window.width * 0.85,
  },
})

const items = [
  {
    id: 0,
    name: 'Metro La Moneda',
  },
  {
    id: 1,
    name: 'Metro cincuenta',
  },
  {
    id: 2,
    name: 'Metro San Joaquín',
  },
  {
    id: 3,
    name: 'Metro Tobalaba',
  },
  {
    id: 4,
    name: 'Mall X',
  },
]

export default FindTripScreen
