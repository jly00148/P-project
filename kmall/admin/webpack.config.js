const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');// 新用法
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// console.log(CleanWebpackPlugin);
const publicPath = "/";
module.exports = {
    mode:'development',
    entry:{// 入口
        index:'./src/index.js'
    },
    output:{
        filename:'[name].[hash].bundle.js',
        publicPath:publicPath,
        path:path.resolve(__dirname,'dist')
    },
    module:{
        rules:[
            // 旧写法
            // {
            //     test:/\.css$/i,
            //     use:[
            //         'style-loader',
            //         'css-loader'
            //     ]
            // },

            {
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
            {
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

            //babel
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        // presets:['env','react'],
                        presets:['env','es2015','react','stage-3'],
                        plugins:[["import",{"libraryName":"antd","libraryDirectory":"es","style":"css"}]] //antd 按需索取css，不必加载全部css
                    }
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            inject:true,
            hash:true
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({})
    ],
    devServer:{
        contentBase:'./dist',//内容的目录
        port:8080,//服务器运行的端口
        historyApiFallback:true // H5路由刷新页面不用向后台发送数据
    }

}