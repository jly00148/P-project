require('pages/common/search')
require('pages/common/nav')
require('pages/common/footer')
require('./index.css')
var _side = require('pages/common/side')
var api = require('api')
var _util = require('util')

var page = {
    init: function() {
        this.renderSide()
        this.loadUsername()
    },
    renderSide:function(){
        _side.render('user-update-password')
    },
    loadUsername:function(){
        var _this = this
        api.getUsername({
            success:function(data){
                _this.username = data.username
            }
        })
    },
}

$(function(){
    page.init()
})

