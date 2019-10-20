import { applyMiddleware, combineReducers, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import userReducer from './reducers/user'
import { userModel } from './models/user'

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  responseType: 'json',
})

const reducer = combineReducers({
  user: userReducer,
  loading: false,
})

export const store = createStore(
  reducer,
  { user: userModel },
  applyMiddleware(axiosMiddleware(client))
)
