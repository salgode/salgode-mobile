import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { useState } from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { SafeAreaView } from 'react-navigation'
import * as Sentry from 'sentry-expo'
import AppNavigator from './navigation/AppNavigator'
import { store } from './redux/store'
import Constants from 'expo-constants'
import ErrorBoundary from './components/ErrorBoundary'
// Esto es para arreglar el ancho del header de react navigation
// No es un bug, solución aca https://github.com/react-navigation/react-navigation/releases/tag/v1.0.0-beta.26
if (Platform.OS === 'android') {
  SafeAreaView.setStatusBarHeight(0)
}

Sentry.init({
  dsn: 'https://3b65a5c913f649f8a31690cd68f82ebb@sentry.io/1811743',
  enableInExpoDevelopment: false,
  debug: true,
})
Sentry.setRelease(Constants.manifest.revisionId)
export default function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => setLoadingComplete(true)}
      />
    )
  }
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    </ErrorBoundary>
  )
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
      require('./assets/images/icon.png'),
      require('./assets/images/login_icon.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    }),
  ])
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
  },
})
