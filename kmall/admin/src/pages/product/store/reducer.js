import * as types  from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
    list:[

    ],

    isFetching:false,
    categories:[],
    mainImage:'',
    images:'',
    detail:'',
    validateStatus:'',
    help:'',
    validateStatus1:'',
    help1:''    
})

export default (state=defaultState,action)=>{
    if(action.type == types.PAGE){
        // return state.set('list',fromJS(action.payload.list))
        return state.merge({
            list:fromJS(action.payload.list),
            current:action.payload.current,
            total:action.payload.total,
            pageSize:action.payload.pageSize
        })
    }
    if(action.type == types.LOADING_REQEST_START){
        return state.set('isFetching',true)
    }
    if(action.type == types.LOADING_REQEST_DONE){
        return state.set('isFetching',false)
    }
    if(action.type == types.ADD_CATEGORIES){
        return state.set('categories',fromJS(action.payload))
    }
    if(action.type == types.ADD_CATEGORIES_LIST){
        return state.merge({
            list:fromJS(action.payload.list),
            current:action.payload.current,
            total:action.payload.total,
            pageSize:action.payload.pageSize
        })
    }
    if(action.type == types.HAND_MAIN_IMAGE){
        return state.merge({
            mainImage:action.payload,
            validateStatus:'success',
            help:''
        })
    }
    if(action.type == types.HAND_IMAGES){
        return state.merge({
            images:action.payload,
            validateStatus:'success',
            help:''
        })
    }
    if(action.type == types.HAND_DETAIL){
        return state.set('detail',fromJS(action.payload))
    } 
    if(action.type == types.HAND_MAIN_IMAGE_STATUS){
        return state.merge({
            validateStatus:action.payload,
            help:'请输入封面图片'
        })
    }
    if(action.type == types.HAND_IMAGES_STATUS){
        return state.merge({
            validateStatus1:action.payload,
            help1:'请输入商品图片'
        })
    }       
    return state
}