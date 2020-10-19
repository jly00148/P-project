import { message } from 'antd'
// import  axios from 'axios';
import * as types  from './actionTypes.js'
import api from 'api';
const getSetCountAction = (payload)=>({
    type:types.SET_COUNT,
    payload
})

export const getCountAction = (values)=>{
    return (dispatch,getState)=>{
        api.count('ok')
            .then(result=>{
                if(result.code == 1){
                    dispatch(getSetCountAction(result.data))
                }else{
                    message.error('获取首页数据失败,请稍后再试')
                }
            })
            .catch(err=>{
                message.error('网络错误,请稍后再试')
            })

        // axios({
        //     method: 'get',
        //     url:'http://127.0.0.1:3000/counts/',
        //     withCredentials:true// 默认情况下，跨源请求不提供凭据(cookie、HTTP认证及客户端SSL证明等)。通过将withCredentials属性设置为true，可以指定某个请求应该发送凭据。
        // })
        // .then(result=>{
        //     const data  = result.data
        //     if(data.code == 1){
        //         dispatch(getSetCountAction(data.data))
        //     }else{
        //         message.error('获取首页数据失败,请稍后再试')
        //     }
        // })
        // .catch(err=>{
        //     message.error('网络错误,请稍后再试')
        // })
    }
}