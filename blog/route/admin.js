const express = require('express');
const router = express.Router();
const UserModel = require('../modules/user.js');

// 权限验证：
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>');
        return;
    }
})

router.get('/',(req,res)=>{
    res.render('admin/index',{
        userInfo:req.userInfo
    });
});

router.get('/users',(req,res)=>{
    UserModel.find({},'-password -__v') // 数据库查找并循环到用户列表
    .then(users=>{
        // console.log(user);
        res.render('admin/user-list',{
            userInfo:req.userInfo,
            users
        });        
    })

});
module.exports = router;