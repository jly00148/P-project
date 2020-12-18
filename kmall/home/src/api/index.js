var apiConfig = require('./config.js')
var _util = require('util')

var getApiObj = (apiConfig)=>{
    const apiObj = {}
    for(let key in apiConfig){
        apiObj[key] = (options)=>{
            let url = apiConfig[key][0] || '';
            let method = apiConfig[key][1] || 'get';
            return request({
                url:url,
                method:method,
                data:options.data,
                success:options.success,
                error:options.error
            })
        }
    }

    return apiObj
}

const request = (options)=>{
    $.ajax({
        url:options.url,
        method:options.method,
        data:options.data,
        dataType:'json',
        success:function(result){
            if(result.code == 0){//用户名或者密码错误
                options.error && options.error(result.message)
            }
            else if(result.code == 1){//操作成功
                options.success && options.success(result.data)
            }
            else if(result.code == 10){//没有权限
                // window.location.href = '/user-login.html'
            }                        
        },
        error:function(err){//服务器端错误
            options.error && options.error('网络错误，请稍后再试')
        }        
    })
}

module.exports = getApiObj(apiConfig)