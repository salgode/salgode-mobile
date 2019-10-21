import { applyMiddleware, combineReducers, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import userReducer from './reducers/user'
import createTripReducer from './reducers/createTrip'
import { userModel } from './models/user'
import { createTripModel } from './models/createTrip'

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  responseType: 'json',
})

const reducer = combineReducers({
  user: userReducer,
  createTrip: createTripReducer,
  loading: false,
})

export const store = createStore(
  reducer,
  { user: userModel, createTrip: createTripModel },
  applyMiddleware(axiosMiddleware(client))
)
