// import { combineReducers } from 'redux';
// 一旦创建就不能再被改变，任何修改添加删除都会返回一个新的immutable对象，
// 对象中的一个节点发生变化，只修改这个节点和它受影响的父节点，其他的节点则共享
import { combineReducers } from 'redux-immutable';
import { reducer as loginReducer } from 'pages/login/store';
import { reducer as homeReducer } from 'pages/home/store';
import { reducer as userReducer } from 'pages/user/store';
import { reducer as categoryReducer } from 'pages/category/store';
import { reducer as productReducer } from 'pages/product/store';

export default combineReducers({
    login:loginReducer,
    home:homeReducer,
    user:userReducer,
    category:categoryReducer,
    product:productReducer
})
