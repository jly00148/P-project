require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var modal = require('./modal.js')
var hogan = require('hogan.js')
var _util = require('util')
var api = require('api')

var productBoxTpl =  require('./productBox.tpl')
var shippingsTpl =  require('./shippingBox.tpl')


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
        var _this = this;
        api.getShippingsList({
            success:function(shippings){
                var html = _util.render(shippingsTpl,{shippings:shippings},hogan)
                _this.$shippingBox.html(html)
            }
        })
    },
    bindEvent:function(){
        this.$shippingBox.on('click','.shipping-add',function(){
            modal.show()//点击显示弹出地址
        })

        //删除个人地址和信息
        this.$shippingBox.on('click','.shipping-delete',function(){
            var $this = $(this)
            var shippingId = $this.parents('.shipping-item').data('shipping-id');
            api.deleteShippings({
                data:{
                    id:shippingId
                },
                success:function(shippings){
                    _util.goResult('delete')
                }
            })
        })
    }
}

page.init()