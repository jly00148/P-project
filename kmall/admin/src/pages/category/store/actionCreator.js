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
const getSetPageAction = (payload)=>({
    type:types.ADD_CATEGORIES_LIST,
    payload
})


//添加分类
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

//将添加好的分类映射到form表单里
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

//将上述的内容添加到展示页面
export const getCategoriesListAction = (page)=>{
    return (dispatch,getState)=>{
        dispatch(getLoadingReqestStartAction())//获取数据之前发送dispatch改变isFetching的值为true
        api.getCategoriesList(page)
        .then(result=>{
            if(result.code == 1){
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
