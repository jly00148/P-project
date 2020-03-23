const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = express();
const port = 3000;

app.use(express.static('public')) // 请求静态资源

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

// 3.3设置cookies中间件：
// app.use((req,res,next)=>{
//     req.cookies = new Cookies(req,res);
//     // console.log(req.cookies.get('userInfo')); // 接收到user.js文件req.cookies.set的键：userInfo,他的值是{"isAdmin":false,"_id":"5e6e4265a1ded954342b0579","username":"a123"} string
  
//     req.userInfo = {}
//     let userInfo = req.cookies.get('userInfo');
//     if(userInfo){
//         req.userInfo = JSON.parse(userInfo); // req对象上添加属性userInfo，它的值是上面userInfo;route文件下的index.js文件里req对象就会有userInfo属性。
//     }
//     next();
// })

//3.4 添加session中间件：
app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它没有变化
    resave:true,
    // 强制将未初始化的session存储
    saveUninitialized:true,
    //如果为true，则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间为1天
    cookie:{maxAge:1000*60*60*24},// 登录时开始设置cookie过期时间
    store:new MongoStore({ mongooseConnection:mongoose.connection }) // session存储到数据库相关配置
}))

app.use((req,res,next)=>{
    req.userInfo = req.session.userInfo || {}
    // console.log(req.userInfo)
    next();
})

// 3.5 渲染index.html使用express.Router()方法,同理下
app.use('/',require('./route/index.js')); // 请求首页
app.use('/user',require('./route/user.js')); // 请求用户登录路由
app.use('/admin',require('./route/admin.js'));  // 请求用户后台管理路由
app.use('/category',require('./route/category.js'));  // 请求用户分页相关路由

//连接数据库服务：
mongoose.connect('mongodb://localhost/blog',{ useUnifiedTopology: true, useNewUrlParser: true  });
const db = mongoose.connection;

 // 连接数据库失败
db.on('error',(err)=>{
    console.log('connect err...');
    throw err;
})

 // 连接数据库成功
db.on('open',()=>{
    console.log('connect successful...');
})

// 监听
app.listen(port,()=>{
    console.log(`server is running at:127.0.0.1:${port}`)
})