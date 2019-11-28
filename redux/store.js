import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import { actions as userActions } from './actions/user'
import {
  createTripReducer,
  slotsReducer,
  spotsReducer,
  tripReducer,
  userReducer,
} from './reducers'
import {
  createTripModel,
  spotsModel,
  futureTripsModel,
  userModel,
} from './models/createTrip'
import * as Sentry from 'sentry-expo'

// eslint-disable-next-line no-undef
const baseURL = __DEV__
  ? 'https://staging-api.salgode.com'
  : 'https://api.salgode.com'

// eslint-disable-next-line no-console
console.log(`USING ${baseURL}`)

export const client = axios.create({
  baseURL,
  responseType: 'json',
  requestType: 'json',
})

// client.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request
// })
// client.interceptors.response.use(request => {
//   console.log('Recieving Response', request)
//   return request
// })

const reducer = combineReducers({
  user: userReducer,
  trips: tripReducer,
  createTrip: createTripReducer,
  spots: spotsReducer,
  slots: slotsReducer,
  loading: false,
})

const rootReducer = (state, action) => {
  if (action.type === userActions.USER_SIGNOUT) {
    return reducer({}, action)
  }
  return reducer(state, action)
}

export const store = createStore(
  rootReducer,
  {
    user: userModel,
    createTrip: createTripModel,
    spots: spotsModel,
    trips: futureTripsModel,
  },
  composeWithDevTools(
    applyMiddleware(
      axiosMiddleware(client, {
        onError: err => {
          console.log('Axios Err: ', err)
          Sentry.captureException(err)
          return err
        },
      })
    )
  )
)
