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
const { get } = require('http')


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
                    if(shippings){
                        _util.goResult('delete')
                    }
                }
            })
        })

        //编辑信息
        this.$shippingBox.on('click','.shipping-edit',function(ev){
            //阻止事件冒泡,防止点击时选中改地址
            ev.stopPropagation()
            var $this = $(this)
            var shippingId = $this.parents('.shipping-item').data('shipping-id')
            api.getShippingsDetail({
                data:{
                    id:shippingId
                },
                success:function(shipping){
                    modal.show(shipping)
                },                
            })
        })

        //选中地址
        this.$shippingBox.on('click','.shipping-item',function(){
            var $this = $(this);
            $this.addClass('active')
            .siblings('.shipping-item').removeClass('active')
        })

        //去支付(生成订单)
        this.$productBox.on('click','.btn-submit',function(){
            var $shippingItem = $('.shipping-item')
            if($shippingItem.hasClass('active')){
                api.addOrders({
                    data:{
                        shippingId:$shippingItem.data('shipping-id')
                    },
                    success:function(order){
                        window.location.href = "./payment.html?No="+order.orderNo
                    },
                    error:function(){
                        _util.showErrorMsg(mag)
                    }
                })
            }else{
                alert('请选择地址后再支付！')
            }
        })
    }
}

page.init()