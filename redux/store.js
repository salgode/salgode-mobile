import { applyMiddleware, combineReducers, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import userReducer from './reducers/user'
import futureTripReducer from './reducers/trips'
import { userModel } from './models/user'
import { futureTripsModel } from './models/trips'
import createTripReducer from './reducers/createTrip'
import spotsReducer from './reducers/spots'
import { createTripModel } from './models/createTrip'
import { spotsModel } from './models/spots'
import slotsReducer from './reducers/slots'

export const client = axios.create({
  //baseURL: 'https://7wsx5vxfbi.execute-api.us-east-1.amazonaws.com/staging',
  baseURL: 'https://1gcqbk02ib.execute-api.us-east-1.amazonaws.com/playground', //TODO: get out of playground
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
  futureTrips: futureTripReducer,
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
