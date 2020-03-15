const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'))


//1.设置缓存：
swig.setDefaults({
    cache:false //开发阶段不走缓存，设置为false，上线阶段设置true
})

//2.配制应用模板：
app.engine('html',swig.renderFile) //前者参数是模板引擎名称，后者是模板解析的方法

//2.1 配制应用模板存放的目录：
app.set('views','./views') //前者参数必需写，后者是模板文件存放的目录

//2.2 注册模板引擎：
app.set('view engine','html') //前者参数必需是view engine，后者参数是模板名称，同上

//3 渲染:
//3.1 渲染index.html首页原始方法
// app.get('/',(req,res)=>{
//     res.render('main/index')
// })

// 3.2 中间件：通过express中间件获取前台传过来的数据`：app.use(bodyParser.urlencoded({ extended:false })); app.use(bodyParser.json());在route文件下的路由直接通过res.body获取前台传来的数据
app.use(bodyParser.urlencoded({ extended:false })); 
app.use(bodyParser.json());

// 3.3 渲染index.html使用express.Router()方法,同理下
app.use('/',require('./route/index.js'));
// 3.4 请求/user的路由:
app.use('/user',require('./route/user.js')); 


// 连接数据库：
//连接数据库服务：
mongoose.connect('mongodb://localhost/blog',{ useUnifiedTopology: true, useNewUrlParser: true  });
const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('connect err...');
    throw err;
})

db.on('open',()=>{
    console.log('connect successful...');
})



app.listen(port,()=>{
    console.log(`server is running at:127.0.0.1:${port}`)
})