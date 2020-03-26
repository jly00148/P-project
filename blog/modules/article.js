const mongoose = require('mongoose');

// 1.定义Schema
const articleSchema = new mongoose.Schema({
    title:{
        type:String
    },
    intro:{
        type:String
    },
    content:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    category:{
        type:mongoose.Schema.Types.ObjectId
    },
    click:{
        type:Number,
        default:0
    },
    createAt:{
        type:Date,
        default:Date.now()
    }

})

// 2生成模型Model：
const articleModel = mongoose.model('Article',articleSchema);

// 3导出模型Model：
module.exports = articleModel;