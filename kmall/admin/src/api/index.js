//目标：导出一个对象，对象的属性是方法名，对象的值是方法
import { API_CONFIG,SERVER } from './config.js';
import axios from 'axios';
import { removeUsername } from 'util';

const getApiObj = (apiConfig)=>{
    const apiObj = {};

    for(let key in apiConfig){
        apiObj[key] = (data)=>{
            let url = apiConfig[key][0] || '';
            url = SERVER + url;
            let method = apiConfig[key][1] || 'get';
            return request(url,method,data);//每个函数体分配一个返回值
        }
    }
    return apiObj;// {login: ƒ, logout: ƒ}
}

const request = (url,method,data)=>{
    return new Promise((resolve,reject)=>{
        // 方法一:针对data是对象的处理方法，处理后请求会把页码发送到后台，req.query.page接收
        const options = {
            method:method,
            url:url,
            withCredentials:true
        }

        switch(options.method.toUpperCase()){
            case 'GET':
            case 'DELETE':
            options.params = data//params不能随意更改
            break

            default:
            options.data = data
        }

        console.log('options::',options)
        //方法二：(有缺点：商品管理修改的时候无法传递商品id到后台)
        // if(!isNaN(data)){
        //     url = url +'?'+ 'page'+'='+data;//传页码
        // }
        // console.log(data)
        // axios({
        //     method:method,
        //     url:url,
        //     data:data,
        //     withCredentials:true
        // })

        axios(options)//用的是方法一
        .then(result=>{
            const data  = result.data;
            if(data.code == 0){//用户没有权限，code=0来自routes/counts.js
                removeUsername();//为什么要删除local session？因为是为了做到和后台一致。第一种情况是如果人为(比如手动发送get请求，
                //req.sessions.destroy())删除数据库中的cookie，丢失后刷新页面会找不到数据库中的登录时存储的用户信息而导致没有权限返回code = 0;
                //找不到前台的local session没必要存在。第二种情况是cookie时间过期而没有权限。基于上面两种情况，有必要处理回到登录界面做处理，第一
                //消除local session存储做到和后台一致，第二回到登录界面
                window.location.href = '/';
                reject('用户没有权限');
            }
            resolve(data);
        })
        .catch(err=>{
            reject(err);
        })
    })
}



export default getApiObj(API_CONFIG);//apiConfig参数接收API_CONFIG