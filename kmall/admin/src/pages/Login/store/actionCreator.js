import * as types from './actionTypes';
import axios from 'axios';
export function getChangeCreator(task){
    return {
        type:types.CHANGE_ITEM,
        payload:task
    }
}

export function getAddCreator(payload){
    return {
        type:types.ADD_ITEM,
        payload:payload
    }
}

export function getDelCreator(payload){
    return {
            type:types.DEL_ITEM,
            payload
        }
}

export function getInitDataCreator(payload){
    return {
        type:types.INIT_ITEM,
        payload
    }
}

export const getLoginAction = (values)=>{
    return (dispatch)=>{
        values.role = 'admin';
        axios({
            method:'post',
            url:'http://127.0.0.1:3000/session/users',
            data:values
        })
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log('err:::',err);
        })
    }
}