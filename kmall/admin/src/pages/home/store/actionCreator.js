import { message } from 'antd'
import  axios from 'axios';
import * as types  from './actionTypes.js'

const getSetCountAction = (payload)=>({
    type:types.SET_COUNT,
    payload
})

export const getCountAction = (values)=>{
    return (dispatch,getState)=>{
        axios({
            method: 'get',
            url:'http://127.0.0.1:3000/counts/',
            withCredentials:true// 携带cookie
        })
        .then(result=>{
            const data  = result.data
            if(data.code == 1){
                dispatch(getSetCountAction(data.data))
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })
    }
}