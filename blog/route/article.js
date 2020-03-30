const express = require('express');
const router = express.Router();
const categoryModel = require('../modules/category.js');
const articleModel = require('../modules/article.js');

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
    /*
    const options = {
        page:req.query.page,
        model:articleModel,
        projection:' -__v',
        query:{},
        sort:{_id:1},
        populates:[{path:'user',select:'username'},{path:'category',select:'name'}] //1-30
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

    */
// articleModel.find({})
// .then(categories=>{
//     console.log(categories);
// })

   articleModel.getPaginationArticls(req)
   .then(data=>{
            let length = data.users.length;
            res.render('admin/article-list.html',{
                userInfo:req.userInfo,
                articles:data.users,
                page:data.page,
                pages:data.pages,
                list:data.list,
                length
            })
   })
});

// 显示新增文章页面
router.get('/add',(req,res)=>{
    categoryModel.find({},"name").sort({order:1})
    .then(categories=>{
        res.render('admin/article-edit-add.html',{
            userInfo:req.userInfo,
            categories
        });
    })

});

// 向后台添加数据逻辑页面：
router.post('/add',(req,res)=>{
    const { title,intro,content,category } = req.body;
    // console.log(title,intro,content,category);
    if(title == '' || intro == '' || content == ''){ //分类名称内容为空时逻辑
        res.render('admin/error.html',{
            userInfo:req.userInfo,
            msg:'有内容为空,请检查后输入内容!',
            url:'/article'
        })
    }else{
        articleModel.insertMany({
            category,
            title,
            intro,
            content,
            user:req.userInfo._id
        })
        .then(articles=>{
            console.log(articles);
            res.render('admin/success.html',{
                title:articles.title,
                intro:articles.intro,
                userInfo:req.userInfo,
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

// 编辑分类:(分类名称需要从category集合来)
router.get('/edit/:id',(req,res)=>{
    const { id } = req.params;
    categoryModel.find({},'name').sort({order:1})
    .then(categories=>{
        articleModel.findById(id)
        .then(articles=>{
            res.render('admin/article-edit-add.html',{
                userInfo:req.userInfo,
                articles,
                categories
            });
        })
        .catch(err=>{
            throw err;
        })
    })
    .catch(err=>{
        res.render('admin/error.html',{
            user:req.userInfo,
            msg:'操作数据库出错，请稍后再试'
        })
    })

})

// 修改分类
router.post('/edit',(req,res)=>{
    const {id,category,title,intro,content} = req.body;
    articleModel.updateOne({_id:id},{
        category,
        title,
        intro,
        content
    })
    .then(articles=>{
        res.render('admin/success.html',{
            userInfo:req.userInfo,
            articles,
            msg:'编辑文章成功',
            url:'/article'
        })
    })
})

// 删除分类
router.get('/delete/:id',(req,res)=>{
    const { id } = req.params;
    articleModel.deleteOne({_id:id})
    .then(articles=>{
        res.render('admin/success.html',{
            userInfo:req.userInfo,
            msg:'删除文章成功',
            articles,
            url:'/article'
        });
    })
})

router.get('/view/:id',(req,res)=>{
    const { id } = req.params;
    categoryModel.find({},'name').sort({order:1})
    .then(categories=>{
        articleModel.findById(id)
        .then(articles=>{
            res.render('admin/article-view.html',{
                userInfo:req.userInfo,
                articles,
                categories
            });
        })
        .catch(err=>{
            throw err;
        })
    })
    .catch(err=>{
        res.render('admin/error.html',{
            userInfo:req.userInfo,
            msg:'操作数据库出错，请稍后再试'
        })
    })
})
module.exports = router;