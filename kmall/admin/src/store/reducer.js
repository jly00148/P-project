import {ADD_ITEM,CHANGE_ITEM,DEL_ITEM,LOAD_DATA} from './actionType.js';

const defaultState = {
    list:["三国杀"],
    val:'谁是卧底',
}

module.exports = (state=defaultState,action)=>{ 
    // console.log(state,action);

    //不推荐使用
    if(action.type == CHANGE_ITEM){
        /*
        state.val = action.payload
        return state;
        */
       const newState = JSON.parse(JSON.stringify(state));
       newState.val = action.payload;
       return newState;
    }
    else if(action.type == ADD_ITEM){
        if(state.val == ''){
            alert('请输入内容');
        }else{
            const newState = JSON.parse(JSON.stringify(state));
            newState.list.push(state.val);
            newState.val = '';
            return newState;
        }
    }
    else if(action.type == DEL_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.payload,1);
        return newState;
    }
    else if(action.type == LOAD_DATA){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = action.payload;
        return newState;
    }
    
    return state;
}