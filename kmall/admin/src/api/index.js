//目标：导出一个对象，对象的属性是方法名，对象的值是方法
import { API_CONFIG,SERVER } from './config.js';
import axios from 'axios';

const getApiObj = (apiConfig)=>{
    const apiObj = {};

    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            let url = apiConfig[key][0] || '';
            url = SERVER + url;
            let method = apiConfig[key][1] || 'get';
            return request(url,method,data);
        }
    }
    // console.log(apiObj); {login: ƒ, logout: ƒ}
    return apiObj;
}

const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        axios.ajax({
            method: method,
            url:url,
            data:data,
            withCredentials:true    
        })
        .then(result=>{
            const data  = result.data;
            resolve(data);
        })
        .catch(err=>{
            reject(err);
        })
    })
}

export default getApiObj(API_CONFIG);