const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');// 自动生成HTML文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 清除多余文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // css单独打包成一个文件,使页面link引入css,而不是用出口js文件在head标签生成style标签。

const publicPath = "/";
module.exports = {
    mode:'development',
    entry:{// 入口
        index:'./src/index.js'
    },

    output:{
        filename:'[name].[hash].bundle.js',
        publicPath:publicPath, // 生成的index.js文件从根开始(路由)
        path:path.resolve(__dirname,'dist')
    },
    
    module:{
        rules:[
            // 处理css旧写法
            // {
            //     test:/\.css$/i,
            //     use:[
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },

            {
                // 1. 处理css新写法(css单独打包配置)
                test:/\.css$/,
                use:[
                        {
                            loader:MiniCssExtractPlugin.loader,
                            options:{
                            
                            }
                        },
                        "css-loader"
                ]
            },

            {   //2.处理图片
                test:/\.(jpg|jpeg|png|gif)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10
                        }
                    }
                ]
            },

            {   // 3.配置babel
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        // presets:['env','react'],
                        presets:['env','es2015','react','stage-3'],//es6扩展,安装:npm i babel-preset-stage-3 babel-preset-es2015 --save-dev

                        // plugins:[["import",{"libraryName":"antd","libraryDirectory":"es","style":'css'}]] //antd 按需索取css，
                        //不必加载全部cssnpm 需要安装:install babel-plugin-import --save-dev

                        plugins:[["import",{"libraryName":"antd","libraryDirectory":"es","style":true}]] //用babel-plugin-import的style配制引入
                        //样式，需要修改配制值:style从'css'变为true，这样会有引入less文件。除此之外还需要在rules中配制添加配置,配制之前要安装less less-loader,
                        //为什么要安装？因为antd内部css预处理是less,见4.定制主题添加配置。
                    }
                }
            },

            {
                //4.定制主题配置
                test: /\.less$/,
                use:[
                    {
                        loader: 'style-loader',
                    }, 
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    }, 
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                        lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                                modifyVars: {
                                'primary-color': '#1DA57A',
                                'link-color': '#1DA57A',
                                'border-radius-base': '2px',
                            },
                            javascriptEnabled: true,
                            },
                        },
                    }
                ],

            }
        ]
    },

    resolve:{
        alias:{//配制别名
            pages:path.resolve(__dirname,'./src/pages'),
            util:path.resolve(__dirname,'./src/util')
        }
    },

    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html', //模板文件
            filename:'index.html',// 输出文件
            inject:true,// 脚本写在哪个标签里，默认是true，在body之后，可改路径(inject:head)
            hash:true// 给生成的js/css文件添加唯一一个的hash
        }),

        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({})
    ],

    devServer:{
        contentBase:'./dist',// 内容的目录
        port:8080,// 服务器运行的端口
        historyApiFallback:true // H5路由刷新页面不用向后台发送数据
    }
}