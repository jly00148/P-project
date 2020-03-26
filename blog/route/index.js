const express = require('express');
const router = express.Router();
const categoryModel = require('../modules/category.js');

router.get('/',(req,res)=>{
    categoryModel.find({},'name').sort({order:1})
    .then(categories=>{
        res.render('main/index',{
            userInfo:req.userInfo,
            categories // 从app.js文件里的3.3里req对象添加的userInfo,并且通过参数传到模板文件layout.html中。
        })
    })

});

module.exports = router;