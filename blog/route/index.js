const express = require('express');
const router = express.Router();
const categoryModel = require('../modules/category.js');
const articleModel = require('../modules/article.js');


async function commonData(req){
    const categoriesPromise = categoryModel.find({},'name').sort({order:1});
    const articlesPromise = articleModel.getPaginationArticls(req);

    const categories = await categoriesPromise; // 如果直接写ategoryModel.find({},'name').sort({order:1});后面无法解析，这样写同时进行
    const  pageArticles= await articlesPromise;
    return {
        categories,
        pageArticles
    }
}

router.get('/',(req,res)=>{
    /*原代码
    categoryModel.find({},'name').sort({order:1})
    .then(categories=>{
        res.render('main/index',{
            userInfo:req.userInfo,
            categories // 从app.js文件里的3.3里req对象添加的userInfo,并且通过参数传到模板文件layout.html中。
        })
    })
*/

// 前台显示文章列表调用commonData
    commonData(req)
    .then(data=>{
        const { categories,pageArticles } = data;
        res.render('main/index.html',{
            userInfo:req.userInfo,
            articles:pageArticles.users,
            page:pageArticles.page,
            pages:pageArticles.pages,
            list:pageArticles.list,
            categories
        })
    })
    .catch(err=>{
        throw err;
    })
});

// 接收pagination.js文件局部发送ajax
router.get('/articles',(req,res)=>{
    articleModel.getPaginationArticls(req)
    .then(data=>{
        res.json({
            status:0,
            data
        })
    })    

})

module.exports = router;