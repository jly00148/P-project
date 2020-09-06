// import { combineReducers } from 'redux'; // 合并reducer
import { combineReducers } from 'redux-immutable'; // 合并reducer
import { reducer as loginReducer } from '../pages/login/store/index.js';
import { reducer as homeReducer } from '../pages/home/store/index.js';


export default combineReducers({
    login:loginReducer,
    home:homeReducer
})