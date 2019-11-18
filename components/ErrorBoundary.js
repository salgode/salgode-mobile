import React from 'react'
import { Text, View } from 'native-base'
import * as Sentry from 'sentry-expo'
import AsyncStorage from '@react-native-community/async-storage'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    AsyncStorage.clear()
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    Sentry.captureException({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <View>
          <Text>Algo salió mal :( </Text>
          <Text>
            Intenta cerrar y abrir la app. Si tienes mas problemas puedes
            contactarnos en Instagram @salgodecl
          </Text>
        </View>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
