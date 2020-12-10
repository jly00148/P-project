require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var modal = require('./modal.js')
var hogan = require('hogan.js')
var _util = require('util')
var api = require('api')

var productBoxTpl =  require('./productBox.tpl')
var shippingBoxTpl =  require('./shippingBox.tpl')


var page  = {
    init:function(){
        this.$productBox = $('.product-box')
        this.$shippingBox = $('.shipping-box')
        this.loadProductList()
        this.loadShippingList()
        this.bindEvent()
    },
    loadProductList:function(){
        var _this = this
        api.getOrdersProducts({
            success:function(products){
                if(products.cartList.length > 0){
                    var html = _util.render(productBoxTpl,products,hogan)
                    _this.$productBox.html(html)
                }
            }
        })

    },
    loadShippingList:function(){
        var html = _util.render(shippingBoxTpl,{},hogan)
        this.$shippingBox.html(html)
    },
    bindEvent:function(){
        this.$shippingBox.on('click','.shipping-add',function(){
            modal.show()//点击显示弹出地址
        })
    }
}

page.init()