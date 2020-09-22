import { combineReducers } from 'redux-immutable'
import { reducer as loginReducer } from 'pages/login/store'
import { reducer as homeReducer } from 'pages/home/store'

export default combineReducers({
    login:loginReducer,
    home:homeReducer,
})
