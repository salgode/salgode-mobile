import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class TwitterScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://twitter.com/salgodecl',
        }}
      />
    )
  }
}

export default TwitterScreen
