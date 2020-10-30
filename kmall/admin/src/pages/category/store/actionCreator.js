import { message } from 'antd';
import * as types  from './actionTypes.js';
import api from 'api';

const getSetPageAction = (payload)=>({
    type:types.PAGE,
    payload
})

export const getAddAction = (values)=>{
    return (dispatch,getState)=>{
        api.addCategories(values)
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            message.error('网络错误，请稍后再试！');
        })
    }
}