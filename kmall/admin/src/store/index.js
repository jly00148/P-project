import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducer.js'

const middlewares = [thunk]

if (process.env.NODE_ENV === `development`) {//辅助开发阶段，上线阶段不辅助
    const logger = createLogger({

    })
    middlewares.push(logger)
}

//创建store
// const store = createStore(reducer)
const store = createStore(reducer,applyMiddleware(...middlewares))

export default store