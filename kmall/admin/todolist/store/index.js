import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducer.js';

const middleware = [thunk];

if(process.env.NODE_ENV == 'enviroment'){
    const logger = createLogger({});
    middleware.push(logger);
}
const store = createStore(reducer,applyMiddleware(...middleware));

export default  store;