import * as types  from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    list:[

    ],

    isFetching:false,
    categories:[]
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
    if(action.type == types.ADD_CATEGORIES){
        return state.set('categories',fromJS(action.payload))
    }
    return state
}