require('pages/common/search')
require('pages/common/nav')
require('pages/common/footer')
require('./index.css')
var _side = require('pages/common/side')
var tpl = require('./index.tpl')
var _util = require('util')
var api = require('api')
var hogan = require('hogan.js')

var page = {
    init: function() {
        this.renderSide()
        this.getUseInfo()
    },
    renderSide:function(){
        _side.render('user-center')
    },
    getUseInfo:function(){
        api.getUseInfo({
            success:function(user){
                var html = _util.render(tpl,user,hogan)
                $('.side-content').html(html)
            }
        })
    }
}

$(function(){
    page.init()
})

