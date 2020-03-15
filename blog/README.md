# `blog博客说明`：

### `请求静态资源`：把静态资源放在public文件夹内，index.html内链接的资源，通过app.use(express.static('public'))自动加载。

### `连接数据库`：example:mongod --dbpath ./db/(当前文件夹数据库)

### `模板的继承`：
以'layout.html'为模板继承，带下划线页面是原始页面。

### `通过express中间件获取前台传过来的数据`：app.use(bodyParser.urlencoded({ extended:false })); app.use(bodyParser.json());
example:
app.use(bodyParser.urlencoded({ extended:false })); 
app.use(bodyParser.json());
