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

export const setMainImageAction = (payload)=>({
    type:types.HAND_MAIN_IMAGE,
    payload
})

export const setImagesAction = (payload)=>({
    type:types.HAND_IMAGES,
    payload
})

export const setDetailAction = (payload)=>({
    type:types.HAND_DETAIL,
    payload
})

export const setMainImageStatusAction = (payload)=>({
    type:types.HAND_MAIN_IMAGE_STATUS,
    payload
})


export const setImagesStatusAction = (payload)=>({
    type:types.HAND_IMAGES_STATUS,
    payload
})

//添加分类
export const productSaveAction = (err,values)=>{
    return (dispatch,getState)=>{
        const state = getState().get('product');
        const mainImage = state.get('mainImage');
        const images = state.get('images');
        const detail = state.get('detail');

        if(!mainImage){
            dispatch(setMainImageStatusAction('error'))
        }
        if(!images){
            dispatch(setImagesStatusAction('error'))
        }        

    //     dispatch(getLoadingReqestStartAction())
    //     api.addCategories(values)
    //     .then(result=>{
    //         if(result.code == 1){
    //             message.success(result.message,2,function(){
    //                 window.location.reload()//添加完分类后重新刷新使form表单清空
    //             });//数字代表秒,数字后可传回调
    //         }else{
    //             message.error(result.message,2);
    //         }
    //     })
    //     .catch(err=>{
    //         message.error('网络错误，请稍后再试！');
    //     })
    //     .finally(()=>{
    //         dispatch(getLoadingReqestDoneAction())
    //     })
    }
}

//将添加好的分类映射到form表单里
export const getLevelCategories = (level)=>{
    return (dispatch,getState)=>{
        api.getLevelCategories(level)
        .then(result=>{
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
        dispatch(getLoadingReqestStartAction())
        api.getCategoriesList(page)
        .then(result=>{
            if(result.code == 1){
                // console.log(result)
                dispatch(getSetPageAction(result.data))
            }else{
            message.error('获取首页数据失败，请稍后再试！');
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

//更新分类名称
export const handleUpdateNameAction = (name,id)=>{
    return (dispatch,getState)=>{
        const current = getState().get('category').get('current');
        dispatch(getLoadingReqestStartAction())
        api.updateCategoriesList({name,id,current})
        .then(result=>{
            if(result.code == 10){
                message.success('更新分类名称成功',2);
            }else{
                message.error('获取首页数据失败，请稍后再试！');
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

//更新手机分类名称
export const handleUpdateMobileNameAction = (mobileName,id)=>{
    return (dispatch,getState)=>{
        const current = getState().get('category').get('current');
        dispatch(getLoadingReqestStartAction())
        api.updateCategoriesMobileList({mobileName,id,current})
        .then(result=>{
            if(result.code == 10){
                message.success('更新手机分类名称成功',2);
            }else{
                message.error('获取首页数据失败，请稍后再试！');
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

//更新排序
export const handleUpdateOrderAction = (newOrder,id)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current');
        dispatch(getLoadingReqestStartAction())
        api.updateCategoriesOrderList(
            {
                order:newOrder,
                id:id,
                page:page
            }
            )
        .then(result=>{
            if(result.code == 10){
                message.success('更新排序成功',2,function(){
                    window.location.reload()
                });
            }else{
                message.error('获取排序数据失败，请稍后再试！');
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

//更新排序
export const handleIsShowAction = (checked,id)=>{
    return (dispatch,getState)=>{
        const page = getState().get('category').get('current');
        api.updateCategoriesIsShowList(
            {
                isShow:checked,
                id:id,
                page:page
            }
            )
        .then(result=>{
            if(result.code == 10){
                dispatch(getSetPageAction(result.data))
            }else{
                message.error('获取排序数据失败，请稍后再试！');
            }
        })
        .catch(err=>{
            message.error('网络错误，请稍后再试！');
        })
    }
}