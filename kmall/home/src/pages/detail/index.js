require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var hogan = require('hogan.js')
var api = require('api')
var _util = require('util')
var detailTpl = require('./detailTpl.tpl')

var page = {
    init:function(){
        this.$elem = $('.detail-box')
        this.ProductsDetail(),
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this
        //图片切换(事件代理)
        this.$elem.on('click','.product-small-img-item',function(){
            var $this = $(this)
            //小图片样式切换
            $this.addClass('active')
            .siblings('.product-small-img-item').removeClass('active')
        })
    },
    productsDetailParams:{
        id:_util.getParamFromUrl('productId'),
    },

    //轮播图左侧
    ProductsDetail:function(){
        var _this = this
        api.getProductsDetail({
            data:this.productsDetailParams,
            success:function(product){
                if(product){
                    product.images = product.images.split(',')
                    product.activeImage = product.images[0]
                    var html = _util.render(detailTpl,product,hogan)
                    _this.$elem.html(html)
                }else{
                    _this.$elem.html('<p class="empty-message">真不巧，你的商品走丢了</p>')
                }
            }
        })
    },
}

$(function(){
    page.init()
})