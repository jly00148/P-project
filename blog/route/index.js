const express = require('express');
const router = express.Router();
const categoryModel = require('../modules/category.js');
const articleModel = require('../modules/article.js');


async function commonData(req){
    const categoriesPromise = categoryModel.find({},'name').sort({order:1});
    const articlesPromise = articleModel.getPaginationArticls(req);
    const topArticlesPromise = articleModel.find({},'_id title click').sort({click:-1}).limit(10);

    const categories = await categoriesPromise; // 如果直接写ategoryModel.find({},'name').sort({order:1});后面无法解析，这样写同时进行
    const pageArticles= await articlesPromise; // 首页内容展示
    const topArticles = await topArticlesPromise; //点击拍行

    return {
        categories,
        pageArticles,
        topArticles
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
        const { categories,pageArticles,topArticles } = data;
        res.render('main/index.html',{
            userInfo:req.userInfo,
            articles:pageArticles.users,
            page:pageArticles.page,
            pages:pageArticles.pages,
            list:pageArticles.list,
            categories,
            topArticles
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