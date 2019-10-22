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

const client = axios.create({
  baseURL: 'https://7wsx5vxfbi.execute-api.us-east-1.amazonaws.com/staging',
  responseType: 'json',
  requestType: 'json',
})

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
