// import axios from 'axios'
import { message } from 'antd'
import api from 'api';
import * as types  from './actionTypes.js'
import { saveUsername } from 'util'
const getLoginReqestStartAction = ()=>({
    type:types.LOGIN_REQEST_START,
})
const getLoginReqestDoneAction = ()=>({
    type:types.LOGIN_REQEST_DONE,
})

export const getLoginAction = (values)=>{
    return (dispatch,getState)=>{
        dispatch(getLoginReqestStartAction())//把loading值变为true
        values.role = 'admin';
        api.login(values)
        .then(result=>{
            const data  = result.data;
            if(result.code == 1){
                //2.跳转到后台首页
                window.location.href = "/";
                //1.在前端保存登录信息
                saveUsername(result.data.username);

            }else{
                message.error(result.message);
                dispatch(getLoginReqestDoneAction())//把loading值变为false
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试');
        })

        // axios({
        //     method: 'post',
        //     url:'http://127.0.0.1:3000/sessions/users',
        //     data:values,
        //     withCredentials:true
        // })
        // .then(result=>{
        //     const data  = result.data;
        //     if(data.code == 1){
        //         //2.跳转到后台首页
        //         window.location.href = "/";
        //         //1.在前端保存登录信息
        //         saveUsername(data.data.username);
        //     }else{
        //         message.error(data.message)
        //     }
        // })
        // .catch(err=>{
        //     message.error('网络错误,请稍后再试')
        // })
        // .finally(()=>{
        //     dispatch(getLoginReqestDoneAction())
        // })
    }
}

