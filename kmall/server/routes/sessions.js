const Router = require('express').Router

const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')

const router = Router();

//用户登录
router.post("/users",(req,res)=>{
	const { username,password,role} = req.body
	
	let isAdmin = false
	if(role == 'admin'){
		isAdmin = true
	}

	UserModel
	.findOne({username:username,password:hmac(password),isAdmin:isAdmin})
	.then((user)=>{
		if(user){
			 req.session.userInfo = {
			 	_id:user._id,
			 	username:username,
			 	isAdmin:isAdmin
			 }
			 res.json({
				code:1,
				message:"登录成功",
			 	data:{
			 		username:username
			 	}
			 });
		}else{
			res.json({
			 	message:"用户名和密码错误",
			 	data:{
			 		username:username
			 	}
			 })
		}
	})
})

//用户退出
router.delete('/users',(req,res)=>{
	req.session.destroy();//销毁前台session数据
	res.json({
		code:0,
	})
})

module.exports = router;