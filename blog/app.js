const express = require('express');
const swig = require('swig');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.static('public'))


//设置缓存：
swig.setDefaults({
    cache:false //开发阶段不走缓存，设置为false，上线阶段设置true
})

//配制应用模板：
app.engine('html',swig.renderFile) //前者参数是模板引擎名称，后者是模板解析的方法

//配制应用模板存放的目录：
app.set('views','./views') //前者参数必需写，后者是模板文件存放的目录

//注册模板引擎：
app.set('view engine','html') //前者参数必需是view engine，后者参数是模板名称，同上

//渲染：
app.get('/',(req,res)=>{
    res.render('main/index');
})


app.get('/list.html',(req,res)=>{
    res.render('main/list');
})

app.get('/detail.html',(req,res)=>{
    res.render('main/detail');
})


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