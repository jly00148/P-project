const Router = require('express').Router;

const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js')
const router = Router();




//初始化管理员
router.get('/init',(req,res)=>{
	UserModel.insertMany({
		username:'admin',
		password:hmac('admin'),
		isAdmin:true
	})
	.then(result=>{
		res.send('ok')
	})
	.catch(err=>{
		console.log(err)
		res.send('err')
	})
})


module.exports = router;