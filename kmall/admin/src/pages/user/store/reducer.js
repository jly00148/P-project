import * as types  from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    list:[
            {
                _id:1,//人为传key
                username:'admin',
                isAdmin:false,
                phone:12345678900,
                email:'jly00148@sina.com',
                createdAt:'2020-10-01 12:00:00'
            }
    ]
})

export default (state=defaultState,action)=>{
    if(action.type == types.SET_COUNT){
        return state.merge({
            usernum:action.payload.usernum,
            ordernum:action.payload.ordernum,
            productnum:action.payload.productnum,  
        })
    }
    return state
}