import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class InstagramScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://www.instagram.com/salgodecl/',
        }}
      />
    )
  }
}

export default InstagramScreen
