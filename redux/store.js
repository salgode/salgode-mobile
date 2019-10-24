import { applyMiddleware, combineReducers, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import {
  createTripReducer,
  slotsReducer,
  spotsReducer,
  futureTripsReducer,
  userReducer,
} from './reducers'
import {
  createTripModel,
  spotsModel,
  futureTripsModel,
  userModel,
} from './models/createTrip'

export const client = axios.create({
  baseURL: 'https://playground-api.salgode.com', // TODO: get out of playground
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
  futureTrips: futureTripsReducer,
  createTrip: createTripReducer,
  spots: spotsReducer,
  slots: slotsReducer,
  loading: false,
})

export const store = createStore(
  reducer,
  {
    user: userModel,
    createTrip: createTripModel,
    spots: spotsModel,
    futureTrips: futureTripsModel,
  },
  applyMiddleware(axiosMiddleware(client))
)
