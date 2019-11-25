import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class LandingScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://salgode.cl',
        }}
      />
    )
  }
}

export default LandingScreen
