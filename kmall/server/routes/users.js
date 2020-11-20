const Router = require('express').Router;

// const { default: user } = require('../../admin/src/pages/user/index.js');
const UserModel = require('../models/user.js');
const hmac = require('../util/hmac.js')
const pagination = require('../util/pagination.js')
const router = Router();




//插入多个普通用户
router.get('/init',(req,res)=>{
	const users = [];
	for(let i = 0;i<500;i++){
		users.push({
			username:'test'+i,
			password:hmac('test'+i),
			phone:1589747546+i,
			email:'test'+i+'@163.com',
		})

	}
	UserModel.insertMany(users)
	.then(result=>{
		res.send('ok');
	})
	.catch(err=>{
		console.log(err)
		res.send('err')
	})

	// 初始化管理员
	// UserModel.insertMany({
	// 	username:'admin',
	// 	password:hmac('admin'),
	// 	email:'jly0018@163.sina.com',
	// 	phone:'18566924312',
	// 	isAdmin:true
	// })
	// .then(result=>{
	// 	res.send('ok')
	// })
	// .catch(err=>{
	// 	console.log(err)
	// 	res.send('err')
	// })
})


//获取用户列表
router.get('/list',(req,res)=>{
	let options = {
		page: req.query.page,//需要显示的页码
		model:UserModel, //操作的数据模型
		query:{}, //查询条件
		projection:'-password -__v -updatedAt', //投影
		sort:{_id:1} //排序
	}
	pagination(options)
	.then((result)=>{
		res.json({
			code:1,
			data:{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize,
				list:result.list
			}
		})
	})
})
module.exports = router;