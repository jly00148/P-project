import { fromJS, set } from 'immutable'
import {
    LOGIN_REQUEST_START_ACTION,
    LOGIN_REQUEST_END_ACTION
} from './actionTypes';

 const defaultState = fromJS({
   isFetching:false//处理loading
 })


 export default (state=defaultState,action)=>{
    if(action.type === LOGIN_REQUEST_START_ACTION){
        return state.set('isFetching',true);//显示loading
    }
    if(action.type === LOGIN_REQUEST_END_ACTION){
      return state.set('isFetching',false);//去掉loading
  }
   return state
}