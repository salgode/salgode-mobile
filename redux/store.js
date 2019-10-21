import { applyMiddleware, combineReducers, createStore } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import axios from 'axios'
import userReducer from './reducers/user'
import { userModel } from './models/user'

const client = axios.create({
  baseURL: 'https://7wsx5vxfbi.execute-api.us-east-1.amazonaws.com/staging',
  responseType: 'json',
  requestType: 'json',
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
