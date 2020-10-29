import { message } from 'antd';
const moment = require('moment');
// import  axios from 'axios';
import * as types  from './actionTypes.js'
import api from 'api';
const getSetPageAction = (payload)=>({
    type:types.PAGE,
    payload
})
const getLoadingReqestStartAction = ()=>({
    type:types.LOADING_REQEST_START,
})
const getLoadingReqestDoneAction = ()=>({
    type:types.LOADING_REQEST_DONE,
})


export const getUserListAction = (page)=>{
    return (dispatch,getState)=>{
        dispatch(getLoadingReqestStartAction())//获取数据之前发送dispatch改变isFetching的值为true
        api.getUsersList(page)
        .then(result=>{
            if(result.code == 1){
                for(let i = 0;i<result.data.list.length;i++){
                    //result是国际UTC时间，所以在这转换格式
                    result.data.list[i].createdAt = moment(result.data.list[i].createdAt).format('YYYY-MM-DD HH:mm:ss');
                }
                dispatch(getSetPageAction(result.data))
            }else{
            message.error('获取首页数据失败，请稍后再试！');
            }
        })
        .catch(err=>{
            message.error('网络错误，请稍后再试！');
        })
        .finally(()=>{
            dispatch(getLoadingReqestDoneAction())///获取数据完毕后发送dispatch改变isFetching的值false
        })

    }
}