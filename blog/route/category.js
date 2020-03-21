const express = require('express');
const router = express.Router();
const CategorySchema = require('../modules/category.js');

// 权限验证：
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>');
        return;
    }
})

// 显示分类管理页面：
router.get('/',(req,res)=>{
    res.render('admin/category-list.html',{
        userInfo:req.userInfo
    });
});

router.get('/add',(req,res)=>{
    res.render('admin/category-add.html',{
        userInfo:req.userInfo
    });
});

router.post('/add',(req,res)=>{
    const {name,order} = req.body;
    CategorySchema.findOne({name})
    .then(categories=>{
        if(!categories){
            CategorySchema.insertMany({name,order})
            .then(categories=>{
                console.log(categories);
                res.render('admin/category-add.html',{
                    userInfo:req.userInfo
                });
            })
            .catch(err=>{
                throw err;
            })
        }else{
            res.render('admin/category-add.html',{
                userInfo:req.userInfo,
            });
        }
    })
    .catch((err)=>{
        throw err;
    })


});
module.exports = router;