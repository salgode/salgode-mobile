import { applyMiddleware, combineReducers, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import userReducer from './reducers/user'
import createTripReducer from './reducers/createTrip'
import spotsReducer from './reducers/spots'
import { userModel } from './models/user'
import { createTripModel } from './models/createTrip'
import { spotsModel } from './models/spots'

const client = axios.create({
  baseURL: 'https://7wsx5vxfbi.execute-api.us-east-1.amazonaws.com/staging',
  responseType: 'json',
  requestType: 'json',
})

const reducer = combineReducers({
  user: userReducer,
  createTrip: createTripReducer,
  spots: spotsReducer,
  loading: false,
})

export const store = createStore(
  reducer,
  { user: userModel, createTrip: createTripModel, spots: spotsModel },
  applyMiddleware(axiosMiddleware(client))
)
