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
    help1:'',
    category:'',
    name:'',
    description:'',
    price:'',
    stock:'',
    detail:''
})

export default (state=defaultState,action)=>{
    // if(action.type == types.PAGE){
    //     // return state.set('list',fromJS(action.payload.list))
    //     return state.merge({
    //         list:fromJS(action.payload.list),
    //         current:action.payload.current,
    //         total:action.payload.total,
    //         pageSize:action.payload.pageSize
    //     })
    // }

    if(action.type == types.LOADING_REQEST_START){
        return state.set('isFetching',true)
    }
    if(action.type == types.LOADING_REQEST_DONE){
        return state.set('isFetching',false)
    }
    if(action.type == types.ADD_CATEGORIES){
        return state.set('categories',fromJS(action.payload))//为什么要设置immutable数据？因为只有变成immutable数据才添加商品页面(save.js)才能拿到相关)_id等等
    }
    if(action.type == types.ADD_PRODUCTS_LIST){
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
    if(action.type == types.SET_PRODUCT_DETAIL){
        return state.merge({
            category:action.payload.category._id,
            name:action.payload.name,
            description:action.payload.description,
            price:action.payload.price,
            stock:action.payload.stock,
            detail:action.payload.detail,
            mainImage:action.payload.mainImage,
            images:action.payload.images
        })
    }          
    return state
}