const Router = require('express').Router;
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js')

const router = Router();

//初始化管理员(3000端口访问:http://localhost:3000/user/init),即可插入初始化管理员
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
		res.send('err')
	})
})

module.exports = router;