require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var hogan = require('hogan.js')
var api = require('api')
var _util = require('util')
var cartTpl = require('./cartTpl.tpl')

var page = {
    init:function(){
        this.$elem = $('.cart-box')
        this.bindEvent()
        this.loadCarts()
    },
    loadCarts:function(){
        var _this = this;
        api.getCarts({
            success:function(cart){
                _this.renderCart(cart)
                // if(cart.cartList.length > 0){
                //     var html = _util.render(cartTpl,cart,hogan)
                //     _this.$elem.html(html)
                // }else{
                //     _this.$elem.html('<p class="empty-message">您的购物车还没有商品!</p>') 
                // }
            }
            ,error:function(){
                _this.showErrorPage()
            }
        })
    },
    renderCart:function(cart){
        if(cart.cartList.length > 0){
            var html = _util.render(cartTpl,cart,hogan)
            this.$elem.html(html)
        }else{
            this.$elem.html('<p class="empty-message">您的购物车还没有商品!</p>') 
        }
    },
    showErrorPage:function(){
        this.$elem.html('<p class="empty-message">好像出错了,请稍后再试!</p>') 
    },
    //处理商品选择操作
    bindEvent:function(){
        var _this = this;

        //处理选择单个(点击上下两个全选不起作用)
        this.$elem.on('click','.select-one',function(){
            var $this = $(this)
            
            //从父元素中过去获取Id
            var productId = $this.parents('.product-item').data('product-id')
            if($this.is(':checked')){//选中
                api.updateCartsChoices({
                    data:{
                        productId:productId,
                        checked:true
                    },
                    success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
                })
            }else{//取消
                api.updateCartsChoices({
                    data:{
                        productId:productId,
                        checked:false
                    },
                    success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
                })
            }
        })
        
        //处理全部选择
        this.$elem.on('click','.select-all',function(){
            var $this = $(this)
            
            // var productId = $this.parents('.product-item').data('product-id'),处理选择全部商品不需要传id。原因：因为选中和没选中在后台已经存储有，下同
            if($this.is(':checked')){//选中
                api.updateCartsChoices({
                    data:{
                        checked:true
                    },
                    success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
                })
            }else{//取消
                api.updateCartsChoices({
                    data:{
                        checked:false
                    },
                    success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
                })
            }
        })

        //处理删除单个
        this.$elem.on('click','.delete-one',function(){
            var $this = $(this)
            
            //从父元素中过去获取Id(不传id也行，与删除选中的商品方法一致,因为选中和没选中在后台已经存储有，下同)
            var productId = $this.parents('.product-item').data('product-id')
            if(_util.showConfirm('您确定要删除购物车选中的商品吗？')){
                api.deleteCarts({
                    data:{
                        productId:productId
                    },
                    success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
                })
            }
        })   
        
        //处理删除选中
        this.$elem.on('click','.delete-selected',function(){
            var $this = $(this)
            if(_util.showConfirm('您确定要删除购物车选中的商品吗？')){
                api.deleteCarts({
                    success:function(cart){
                        _this.renderCart(cart)
                    },
                    error:function(){
                        _this.showErrorPage()
                    }
                })
            }
        })        
    },
    
    
}

$(function(){
    page.init()
})