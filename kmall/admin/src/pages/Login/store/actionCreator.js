import * as types from './actionTypes';
import axios from 'axios';
import { message } from 'antd';
import { saveUsername } from 'util';

const getLoginRequestStartAction = ()=>{//用户登录前loading出现
    return {
        type:types.LOGIN_REQUEST_START_ACTION,
    }
}


const getLoginRequestEndAction = ()=>{//用户登录前loading消失
    return {
        type:types.LOGIN_REQUEST_END_ACTION,
    }
}

export const getLoginAction = (values)=>{
    return (dispatch)=>{
        dispatch(getLoginRequestStartAction())//登录前派发action，改变state中的isFatching属性为true，loading显示出来
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
                //1.在前端保存登录信息(local Storage);
                saveUsername(data.username);
                
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
        .finally(()=>{
            dispatch(getLoginRequestEndAction())//无论是否登录成功都要消掉loading
        })
    }
}