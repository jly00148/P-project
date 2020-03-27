const express = require('express');
const router = express.Router();
const categoryModel = require('../modules/category.js');
const articleModel = require('../modules/article.js');
const pagination = require('../util/pagination.js');

// 权限验证：
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>');
        return;
    }
})

// 显示文章列表：
router.get('/',(req,res)=>{
    const options = {
        page:req.query.page,
        model:articleModel,
        projection:' -__v',
        query:{},
        sort:{_id:1}
    }

    pagination(options)
    .then(data=>{
        res.render('admin/article-list.html',{
            userInfo:req.userInfo,
            articles:data.users,
            page:data.page,
            pages:data.pages,
            list:data.list,
        })
    })
    .catch(err=>{
        throw err;
    })

    // res.render('admin/category-list.html',{
    //     userInfo:req.userInfo
    // });
});

// 显示新增文章页面
router.get('/add',(req,res)=>{
    categoryModel.find({},"name").sort({order:-1})
    .then(categories=>{
        res.render('admin/article-add.html',{
            userInfo:req.userInfo,
            categories
        });
    })

});

// 向后台添加数据逻辑页面：
router.post('/add',(req,res)=>{
    const {title,intro,content} = req.body;
    if(title == '' || intro == '' || content == ''){ //分类名称内容为空时逻辑
        res.render('admin/error.html',{
            userInfo:req.userInfo,
            msg:'有内容为空,请检查后输入内容!',
            url:'/article'
        })
    }else{
        articleModel.insertMany({
            title,
            intro,
            content,
            user:req.userInfo._id
        })
        .then(articles=>{
            res.render('admin/success.html',{
                title:articles.title,
                intro:articles.intro,
                user:req.userInfo,
                articles,
                msg:'添加文章成功',
                url:'/article'
            })
        })
        .catch(err=>{
            throw err;
        })
    }
});

// 编辑分类
router.get('/edit/:id',(req,res)=>{
    const { id } = req.params;
    categoryModel.findById(id)
    .then(category=>{
        res.render('admin/category-edit-add.html',{
            userInfo:req.userInfo,
            category
        });
    })
})

// 修改分类
router.post('/edit',(req,res)=>{
    const {name,order,id} = req.body;
    // console.log(name,order,id); css 1 5e7a259e25113b08808961cf
    categoryModel.findById(id)
    .then(category=>{
        if(category.name == name && category.order == order){
            res.render('admin/error.html',{
                userInfo:req.userInfo,
                msg:'修改内容无变动,请修改后再提交!',
                category //为什么要传category？在error.html中为了能够顺利返回，防止id丢失，下同
            })
        }else{
            categoryModel.findOne({name})
            .then(category=>{
                if(category){ // 要修改的内容数据库中已经存在，修改失败
                    res.render('admin/error.html',{
                        userInfo:req.userInfo,
                        msg:'修改失败，分类名称已存在!',
                        category
                    })
                }
                else{
                    categoryModel.updateOne({_id:id},{name,order})
                    .then(category=>{
                        res.render('admin/success.html',{
                        userInfo:req.userInfo,
                        msg:'修改成功',
                        category,
                        url:'/category'
                        })                      
                    })
                    .catch(err=>{
                        throw err;
                    })
                }
            })
            .catch(err=>{
                throw err;
            })
        }
    })
    .catch(err=>{
        res.render('admin/error.html',{
            userInfo:req.userInfo,
            msg:'操作数据库出错，请稍后再试'
        }); 
    })
})

// 删除分类
router.get('/delete/:id',(req,res)=>{
    const { id } = req.params;
    categoryModel.deleteOne({_id:id})
    .then(category=>{
        res.render('admin/success.html',{
            userInfo:req.userInfo,
            mag:'删除成功',
            category,
            url:'/category'
        });
    })
})

module.exports = router;