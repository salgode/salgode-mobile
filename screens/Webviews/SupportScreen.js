import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class SupportScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: 'https://docs.google.com/forms/d/e/1FAIpQLSfrWRtmD8sWW8XxBi9qzhHHUKIqHpjt9oM8c3grQ9p1Lz2aTQ/viewform?usp=sf_link',
        }}
      />
    )
  }
}

export default SupportScreen
