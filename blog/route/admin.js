const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest:'public/uploads/' }); // 接收上传的图片文件地址。前台上传的图片要保存到服务器,然后把图片保存的路径回传给编辑器，编辑器拿到路径以img标签显示在富文本内
//upload接收前台发过来的图片文件,没有uploads文件会自动创建一个,upload放在post请求地址和请求函数和返回函数的中间。

const UserModel = require('../modules/user.js');
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

// 后台管理：
router.get('/',(req,res)=>{
    res.render('admin/index',{
        userInfo:req.userInfo
    });
});

// 显示用户列表：
router.get('/users',(req,res)=>{
    //  /*
    //     分页约定：每页只显示2条调用limit(2)方法
    //     第1页:显示2条，跳过0条
    //     第2页:显示2条，跳过2条
    //     第3页:显示2条，跳过4条
    //     第page页，显示2条，跳过(page-1) *2  运用等比数列知识
    //  */

    // let { page } = req.query; // 用户列表页数，通过传参数在req.query上接收  // console.log(typeof page) string
    // // console.log(page); 未传值时，req.query获取不到，undefined，有传值时，数据类型是string，如上
    // page = parseInt(page);
    // if(isNaN(page)){
    //     page = 1; // 
    // }
    // let limit = 2;
    // let skip = (page -1)*limit;

    // UserModel.find({})
    // .then(users=>{
    //     let pages = Math.ceil(users.length / limit); // 定义页数
    //     // console.log(pages); 5  

    //     //传有多少个页码，在user-list.html文件中循环遍历
    //     let list = [];
    //     for(var i = 1;i<=pages;i++){
    //         list.push(i);
    //     }

    //     UserModel.find({},'-password -__v').skip(skip).limit(limit)// 数据库查找并循环遍历到用户列表
    //     .then(users=>{
    //         // console.log(user);
    //         res.render('admin/user-list',{
    //             userInfo:req.userInfo,
    //             users,// 传值遍历对象显示用户列表
    //             page ,// 传页数
    //             pages,
    //             list
    //         });
    //     })   
    // })
    const options = {
        page:req.query.page,
        model:UserModel,
        projection:'-password -__v',
        query:{},
        sort:{_id:1}
    }

    pagination(options)
    .then(data=>{
        res.render('admin/user-list',{
            userInfo:req.userInfo,
            users:data.users,
            page:data.page,
            pages:data.pages,
            list:data.list,
            url:'/admin/users',
        })
    })
    .catch(err=>{
        throw err;
    })

});

//处理上传图片
router.post('/uploadImage',upload.single('upload'),(req,res)=>{ // upload为前台From Data发送的数据
    // console.log(req.file) //req.file接收
    const uploadFilePath = '/uploads/'+ req.file.filename;
    res.json({
        uploaded:true,
        url:uploadFilePath
    })
})

module.exports = router