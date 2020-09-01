// import { combineReducers } from 'redux'; // 合并reducer
import { combineReducers } from 'redux-immutable'; // 合并reducer
import { reducer as todolistReducer } from '../pages/Todolist/store/index.js'


export default combineReducers({
    todolist:todolistReducer
})