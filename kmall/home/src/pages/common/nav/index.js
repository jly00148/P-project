require('./index.css')
var api = require('api')
var _util = require('util')
var page = {
    init:function(){
        this.loadUsername()
        this.bindEvent()
        this.getCartsCount()
    },
    bindEvent:function(){
        $('#logout').on('click',function(){
            api.logout({
                success:function(){
                    $('.not-login')
                    .show()

                    $('.login')
                    .hide()
                    .find('.username')
                    .text('')
                    window.location.reload()
                },
                error:function(){
                    _util.showErrorMessage('网络错误，请稍后再试')
                }
            })
        })
    },
    
    loadUsername:function(){
        api.getUsername({
            success:function(data){
                $('.not-login')
                .hide()
                
                $('.login')
                .show()
                .find('.username')
                .text(data.username)
            },
        })
    },
    getCartsCount:function(){
        var $cartNum = $('.nav-list .cart-num')
        api.getCartsCount({
            success:function(count){
                $('.vacant-box').hide()
                $('.cart-box1').show()
                $cartNum.text(count || 0)
            },
            error:function(){
                $('.cart-box1').show()
                $('.vacant-box').hide()
                $cartNum.text(0)
            }
        })
    }
}



page.init()
module.exports=page.getCartsCount//把购物车显示的数值函数到出去