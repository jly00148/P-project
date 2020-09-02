// import { combineReducers } from 'redux'; // 合并reducer
import { combineReducers } from 'redux-immutable'; // 合并reducer
import { reducer as todolistReducer } from '../pages/todolist/store/index.js'
import { reducer as loginReducer } from '../pages/login/store/index.js'


export default combineReducers({
    todolist:todolistReducer,
    login:loginReducer
})