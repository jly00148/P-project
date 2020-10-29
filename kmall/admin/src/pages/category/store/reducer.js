import * as types  from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    list:[
        // {   _id:1,//需要一个key
        //     username:'admin',
        //     isAdmin:true,
        //     email:'jly00148@163.com',
        //     phone:11111111111,
        //     createdAt:'2020-10-10 12:00:00'
        // }
    ],
    // current:1,
    // total:100,
    // pageSize:10
    isFetching:false
})

export default (state=defaultState,action)=>{
    if(action.type == types.PAGE){
        // return state.set('list',fromJS(action.payload.list))
        return state.merge({
            list:fromJS(action.payload.list),
            current:action.payload.current,
            total:action.payload.total,
            pageSize:action.payload.pageSize
        })
    }
    if(action.type == types.LOADING_REQEST_START){
        return state.set('isFetching',true)
    }
    if(action.type == types.LOADING_REQEST_DONE){
        return state.set('isFetching',false)
        
    }    
    return state
}