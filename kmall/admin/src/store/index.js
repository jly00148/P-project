import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';
import reducer from './reducer.js'

const middleWare = [thunk];
if(process.env.NODE_ENV === `development`){
    middleWare.push(logger)
}

const store = createStore(reducer,applyMiddleware(...middleWare))

export default store