require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var hogan = require('hogan.js')
var paymentTpl = require('./payment.tpl')
var _util = require('util')
var api = require('api')


var page = {
    init:function(){
        this.$elem = $('.payment-box')
        this.loadPayments()
        this.listenPaymentsState()
        this.Timer = null;
    },
    //从url中获取id
    paramsPayment:function(){
        return {No:_util.getParamFromUrl('No')}
    },
    loadPayments:function(){
        var _this = this;
        _this.orderNo = this.paramsPayment()

        if(this.paramsPayment()){
            api.getPayments({
                data:{
                    orderNo:_this.orderNo.No
                },
                success:function(payment){
                   var html =  _util.render(paymentTpl,payment,hogan)
                   _this.$elem.html(html)
                   _this.listenPaymentsState()//监听订单状态
                },
                error:function(){
                    _this.$elem.html('<p class="empty-message">获取支付信息失败，请稍后再试</p>')
                }
            })
        }else{
            this.$elem.html('<p class="empty-message">没有商品，无法支付</p>')
        }
    },

    listenPaymentsState:function(){
        var _this = this;
        this.Timer = setInterval(function(){
            api.getPaymentsStatus({
                data:{
                    orderNo:_this.orderNo.No
                },
                success:function(result){
                    if(result){
                    clearInterval(this.Timer)
                    window.location.href = '/result.html?type=payment&orderNo='+_this.orderNo.No
                    }
                },
                error:function(){

                }
            })
        },1000)
    }
}

page.init()