const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('main/index',{
        userInfo:req.userInfo // 从app.js文件里的3.3里req对象添加的userInfo,并且通过参数传到模板文件layout.html中。
    })
});

module.exports = router;