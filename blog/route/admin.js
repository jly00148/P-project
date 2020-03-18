const express = require('express');
const router = express.Router();

// 权限验证：
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>')
    }
})

router.get('/',(req,res)=>{
    res.send('admin');
});

module.exports = router;