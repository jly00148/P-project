import { message } from 'antd';
import * as types  from './actionTypes.js';
import api from 'api';

const getLoadingReqestStartAction = ()=>({
    type:types.LOADING_REQEST_START,
})
const getLoadingReqestDoneAction = ()=>({
    type:types.LOADING_REQEST_DONE,
})
const addCategoriesAction = (payload)=>({
    type:types.ADD_CATEGORIES,
    payload
})


export const getAddAction = (values)=>{
    return (dispatch,getState)=>{
        dispatch(getLoadingReqestStartAction())
        api.addCategories(values)
        .then(result=>{
            console.log(result)
            if(result.code == 1){
                message.success(result.message,2,function(){
                    window.location.reload()//添加完分类后重新刷新使form表单清空
                });//数字代表秒,数字后可传回调
            }else{
                message.error(result.message,2);
            }
        })
        .catch(err=>{
            message.error('网络错误，请稍后再试！');
        })
        .finally(()=>{
            dispatch(getLoadingReqestDoneAction())
        })
    }
}
export const getLevelCategories = (level)=>{
    return (dispatch,getState)=>{
        api.getLevelCategories(level)
        .then(result=>{
            console.log(result)
            dispatch(addCategoriesAction(result.data));
        })
        .catch(err=>{
            message.error('网络错误，请稍后再试！');
        })
    }
}