// import { combineReducers } from 'redux'; // 合并reducer
import { combineReducers } from 'redux-immutable'; // 合并reducer
import { reducer as todolistReducer } from 'pages/Todolist/store/index.js'
import { reducer as loginReducer } from 'pages/Login/store/index.js'


export default combineReducers({
    todolist:todolistReducer,
    todolist:loginReducer
})