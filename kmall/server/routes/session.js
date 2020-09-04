const Router = require('express').Router;
const router = Router();
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js');


router.post('/users',(req,res)=>{
    const body = req.body;//获取登录信息

	let result  = {
		code:0,// 0 代表成功 
		message:''
    }
    UserModel
    .findOne({username:body.username,password:hmac(body.password)})
    .then(user=>{
        if(user){//登录成功
            result.message = '登录成功',
            result.username = body.username
            res.json(result);
        }else{
            result.code = 1;
            result.message = '户名和密码错误'
            res.json(result);  
        }
    })
})

module.exports = router;