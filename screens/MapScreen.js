import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class MapScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri:
            'https://www.google.com/maps/d/u/0/viewer?mid=16Kt-BFUrWVFqm4nCftaDyt4fK21roimT&ll=-33.47731481997652%2C-70.78590744999997&z=10',
        }}
      />
    )
  }
}

export default MapScreen
