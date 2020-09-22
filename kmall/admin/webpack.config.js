const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')// 自动生成HTML文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')// 清除多余文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")// css单独打包成一个文件,使页面link引入css,而不是用出口js文件在head标签生成style标签

module.exports = {
    //指定环境
    mode:'development',
    // mode:'production',
    //单一入口
    // entry: './src/index.js',
    // entry: {main:'./src/index.js'},
    //多入口
    entry:{
        index:'./src/index.js',
    },
    //出口
    output: {
        //「入口分块(entry chunk)」的文件名模板
        // filename: '[name]-[chunkhash]-bundle.js',
        filename: '[name]-[hash]-bundle.js',
        //指定输出参考根路径
        publicPath:'/',
        //所有输出文件的目标路径
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        alias:{//配制别名
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util'),
            common:path.resolve(__dirname,'./src/common'),
        }
    },    
    module: {
        rules: [
        //处理css文件
        /*
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
        */
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                }
              },
              "css-loader"
            ]
          },       
        //处理图片
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 400
                        }
                    }
                ]
            },
        //bable
            {   //配制babel
                test:/\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['env', 'react'],
                        presets: ['env','es2015','react','stage-3'],//es6扩展,安装:npm i babel-preset-stage-3 babel-preset-es2015 --save-dev

                        // plugins:[["import",{"libraryName":"antd","libraryDirectory":"es","style":'css'}]] //antd 按需索取css，
                        //不必加载全部css。npm 需要安装:install babel-plugin-import --save-dev

                        plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true }] ]//用babel-plugin-import的style配制引入
                        //样式，需要修改配制值:style从'css'变为true，这样会有引入less文件。除此之外还需要在rules中配制添加配置,配制之前要安装less less-loader,
                        //为什么要安装？因为antd内部css预处理是less,见4.定制主题添加配置。                        
                    },
                }
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS
                }, {
                    loader: 'less-loader', // compiles Less to CSS
                    options: {
                        modifyVars: {
                            'primary-color': '#1DA57A',
                            'link-color': '#1DA57A',
                            'border-radius-base': '2px',
                        },
                        javascriptEnabled: true,
                    },
                }],
            }            
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'./src/index.html',//模板文件
            filename:'index.html',//输出的文件名
            //inject:'head',//脚本写在那个标签里,默认是true(在body结束后)
            hash:true,//给生成的js/css文件添加一个唯一的hash
        }),
        new MiniCssExtractPlugin({})
    ],
    devServer: {
        contentBase: './dist',//内容的目录
        host:'127.0.0.1',
        port:3001,//指定服务端口
        historyApiFallback:true//让h5路由不向后端发送请求
    },                
}