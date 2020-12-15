require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')

$(function(){
    var type  = _util.getParamFromUrl('type') || 'default';
    $('.'+type).show()

    //单独处理payment
     if(type == 'payment'){
        var orderNo = _util.getParamFromUrl('orderNo');
        var $btn = $('.order-detail')
        var url = $btn.attr('href') + orderNo;
        $btn.attr('href',url)
     }
})