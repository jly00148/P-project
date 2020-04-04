# blog博客说明：

## 一、页面请求基本步骤：

### 准备前工作：
把静态文件放到public文件夹下，在后台服务器app.js通过app.use(express.static('public'))，后台可以获取静态资源再到前台渲染，配制相关缓存，配制应用模板、存放目录、注册模板引擎相关工作。
通过mongoose启动数据库，设置默认数据存放路径。

### 请求静态资源：
把静态资源放在public文件夹内，通过app.use(express.static('public'))自动加载，index.html是首页，通过在app后台服务app.js文件express函数模块调用的返回值app上use方法设置请求路由,
各项路由请求都分离在同文件夹下的route下，index.js是index.html首页路由，user是用户注册、登录等相关路由。

### 页面继承：
以layout.html为模板文件，其他页面通过它继承。

### 注册逻辑：
发送/user/Register路由，后台通过app.use()方法接收，在route文件下user.js文件下从数据库查找、验证、设置hmac密码加密等逻辑并且发送相关数据到前台。

### 登录逻辑：
登录逻辑验证过程和注册过程基本相似，但是登录成功后刷新页面会回到首页，需要在登录成功时设置cookies，为：req.cookies.set('userInfo',JSON.stringify(user))；初始请求首页时候不会有cookies，
在登录成功时设置cookies，后台app.js通过设置req.cookies.get('userInfo');就会获取到cookies，在req对象设置属性userIno，把获取到的cookies值赋给userInfo，然后在rout文件的index.js传入是对
象的参数，在layout.html文件下通过逻辑设置跳转用户中心。设置好后并不能立即显示，需要刷新一下(window.lacation.reload())。

### 用户退出：
发送get请求，在user.js文件匹配的路由取消删除cookies，代码：req.cookies.set('userInfo',null); 将信息返回common.js。

### cookie+session:
原理：cookie保存session id,session在服务端保存储用户的信息
在app.js中引入：const session = require('express-session');注销掉cookies中间件，通过app.use添加session中间件，在user.js文件中，注销掉cookies,登录查找成功时设置req.session.userInfo = user;
在app.js中就会获得req.session.userInfo上的值，然后赋值给req.userInfo，同理在layout.html文件传参数。重启服务器后会销毁session，因此想了办法把session存储到数据库中，重启服务器后，数据库里的值并
不会被销毁，引入const MongoStore = require('connect-mongo')(session);重启服务器后，前台请求时把cookie携带上，服务器就会从数据库中把存储的session拿出来，找到session的_id和前台_id(value)的对应关系。

### 销毁session:
```
req.session.destroy();
```
### 管理员权限：
在admin.js文件中，跳转管理中心只能是管理员，用户无法登录，需要通过中间件在前面设置权限。

### 富文本编辑器地址: `https://ckeditor.com/`

## 二、相关注意点：
### `连接数据库`：
example:mongod --dbpath ./db/(当前文件夹数据库)

### 模板的继承：
以'layout.html'为模板继承，带下划线页面是原始页面。

### 用户列表传值：
在网址传值，在router文件的admin.js文件用req.query接收，初始要显示第一页，在req,query获取的是undefined，undefined无法转数字，显示NaN，用isNaN(page)方法判断，令page=1，即可让初始页面传值到user_list.html。

### 通过express中间件获取前台传过来的数据：
```
app.use(bodyParser.urlencoded({ extended:false })); 
app.use(bodyParser.json());
```
(以上两行代码写在app或server请求的路由前面)

### post和get请求传参在后台接收数据`：
post请求发送数据，后台路由用req.body接收，get用req.query接收，get请求发送字符串用req.params接收

### 为什么后台返回给前台的数据是json格式？：
因为从后台传给前台只能是以字符串形式传输，但是前台必需要获取相关数据，字符串则不行，通过后台字符串格式数据转换json格式，前台就可获取到。

### bootstrap相关：
* class="form-control"是给input框添加样式，与父元素div的class标签col-sm-2保持一致长
* label标签中的for的值与input框中的id值保持一致，为了能够点击label选中input框
* placeholder与value相冲突，有value值时placeholder不起作用
* 下拉框用select标签