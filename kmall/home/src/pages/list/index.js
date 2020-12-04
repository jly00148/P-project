require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var hogan = require('hogan.js')//commonJs引入
var api = require('api')
var _util = require('util')
var listTpl = require('./listTpl.tpl')

var page = {
    productsListParams:{
        category:_util.getParamFromUrl('categoryId'),
        keyword:_util.getParamFromUrl('keyword'),
        page:_util.getParamFromUrl('page') || 1,
        orderBy:_util.getParamFromUrl('orderBy') || 'default',
    },
    init:function(){
        this.loadProductsList()
    },

    //轮播图左侧
    loadProductsList:function(){
        api.getProductsList({
            data:this.productsListParams,
            success:function(result){
                if(result.list.length > 0){
                    var html = _util.render(listTpl,{list:result.list},hogan)
                    $('.product-list-box').html(html)
                }else{
                    $('.product-list-box').html('<p class="empty-message">真不巧，你的商品走丢了</p>')
                }
            }
        })
    },
}

$(function(){
    page.init()
})