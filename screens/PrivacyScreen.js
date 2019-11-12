import React, { Component } from "react";
import { WebView } from "react-native-webview";

class PrivacyScreen extends Component {
  render() {
    return (
      <WebView
        source={{
          uri:
            "https://docs.google.com/document/d/e/2PACX-1vRhgDyUIfbRWDQLmL7iJ4hTKT3btkPuwQ3SnY6oKok0Nz_Fr4Xp96aHWcgp7bxp7w/pub"
        }}
      />
    );
  }
}

export default PrivacyScreen;
