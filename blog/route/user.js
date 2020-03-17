const express = require('express');
const UserModel = require('../modules/user.js');
const hmac = require('../util/hmac.js');
// const querystring = require('querystring');
const router = express.Router();


// 一： 后台接收前台common.js文件(二)注册逻辑：
router.post('/register',(req,res)=>{

//1 对前台注册时返回后台的数据进行解析：
//1.1 复杂获得post请求过来的数据：
// let  body = '';
// req.on('data',(chunk)=>{
//      body += chunk;
// })
// req.on('end',()=>{
//     // console.log(body); username=a123&psssword=123;
//     // console.log(querystring.parse(body)); // querystring把username=a123&psssword=123解析成对象：[Object: null prototype] { username: 'a123', psssword: '123' }
// })
//     res.json({
//         status:0
//     });


//2.通过express中间件：app.use(bodyParser.urlencoded({ extended:false })); app.use(bodyParser.json())
// console.log(req.body);  [Object: null prototype] { username: 'a123', psssword: '123' }

// 2.1通过req函数上的body方法获得前台注册返回来的数据
// 3.测试是否注册过：
// 3.1 通过解构赋值获取username,password
const {username,password} = req.body;

// 3.2 返回给前台数据和判断result
const result = {
    status:0,
    msg:""
}

UserModel.findOne({username}) // 返回一个promise
.then(user=>{
    if(user){// 表示用户已经存在
        result.status = 10;
        result.msg = '用户已经存在';
        res.json(result);
    }else{// 表示用户注册通过
        UserModel.insertMany({
            username,
            password:hmac(password)
        })
        .then((user)=>{
            result.msg = '注册成功,请登录!'
            res.json(result);
        })
        .catch(err=>{
            throw err;
        })
    }
})
.catch(err=>{
    // 不是查不到，是查询出错，这种情况很少遇到。
    result.status = 20;
    result.msg = '服务器端错误,请稍后再试！';
    res.json(result);
})

})


// 二： 后台接收前台common.js文件(三)登录逻辑
router.post('/login',(req,res)=>{

    const {username,password} = req.body;
    // 3.2 返回给前台数据和判断result
    const result = {
        status:0,
        msg:""
    }
    
    UserModel.findOne({username,password:hmac(password)},'-password -__v') // 查找时过滤密码，防止前台出现密码
    .then(user=>{
        if(user){// 表示用户查找存在
            // console.log(typeof user); object
            result.data = user;
            req.cookies.set('userInfo',JSON.stringify(user)); // 登录成功后会产生cookies,它的键是'userInfo',值是JSON.stringify(user)
            result.msg = '登录成功';
            res.json(result);
        }else{// 表示用户没有查到或者密码有错误
            result.status = 10;
            result.msg = '用户名或者密码错误';
            res.json(result);
        }
    })
    .catch(err=>{
        // 不是查不到，是查询出错，是服务器端错误，这种情况很少遇到。
        result.status = 20;
        result.msg = '服务器端错误,请稍后再试！';
        res.json(result);
    })
    
    })

module.exports = router;