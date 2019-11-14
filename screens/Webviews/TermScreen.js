import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class TermScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri:
            'https://docs.google.com/document/d/e/2PACX-1vSJmmCaNNemuu3LuTQxeI8FeY_GF7jGxem5ikAr_8gX2UEzddQ6ceddnZGz5nAoGw/pub',
        }}
      />
    )
  }
}

export default TermScreen
