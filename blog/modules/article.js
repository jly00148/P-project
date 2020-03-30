const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');
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
        type:mongoose.Schema.Types.ObjectId,
        ref:'User' //关联相应模型
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    click:{
        type:Number,
        default:0
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})

articleSchema.statics.getPaginationArticls = function(req,query={}){
    const options = {
        page:req.query.page,
        model:articleModel,
        projection:' -__v',
        query:query,
        sort:{_id:1},
        populates:[{path:'user',select:'username'},{path:'category',select:'name'}] //1-30
    }
    return pagination(options);
    
}

// 2生成模型Model：
const articleModel = mongoose.model('Article',articleSchema);

// 3导出模型Model：
module.exports = articleModel;