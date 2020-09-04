import * as types from './actionTypes';
import axios from 'axios';
import { message } from 'antd';
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
            console.log('result',result);
            const data = result.data;
            if(data.code == 0){//登录成功
                //做两件事：
                //1.在前端保存登录信息

                //2.跳转管理系统界面
                message.success(data.message);
                window.location.href = '/';
            }else{//代表失败
                message.error(data.message);
            }
        })
        .catch(err=>{
                message.error('网络错误，请稍后再试！');
        })
    }
}