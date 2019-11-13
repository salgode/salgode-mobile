import { Analytics, Event } from 'expo-analytics'

export const ANALYTICS_CATEGORIES = {
  LogIn: {
    name: 'Log In',
    actions: {
      LogIn: 'Log In',
      SignUp: 'Sign Up',
      LogOut: 'Log Out',
    },
  },
  AsDriver: {
    name: 'As Driver',
    actions: {
      Create: 'Create Trip',
      Accept: 'Accept Passenger',
      Start: 'Start Trip',
      End: 'End Trip',
    },
  },
  AsPassenger: {
    name: 'As Passenger',
    actions: {
      Request: 'Request Trip',
    },
  },
}

class GoogleAnalytics {
  constructor(trackingId = '') {
    if (GoogleAnalytics.instance) {
      return GoogleAnalytics.instance
    }

    if (!trackingId) {
      throw new Error(
        'First time configuration of Google Analytics requires a non empty tracking Id'
      )
    }
    GoogleAnalytics.instance = this

    this.analytics = new Analytics(trackingId)

    return this
  }

  newEvent(category, action, label = null, value = null) {
    this.analytics.event(new Event(category, action, label, value))
  }
}

export const analytics = new GoogleAnalytics('UA-150424162-1')

export default GoogleAnalytics
