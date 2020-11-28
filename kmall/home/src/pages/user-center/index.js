require('pages/common/search')
require('./index.css')
var _side = require('pages/common/side')
var _util = require('util')
var api = require('api')

var page = {
    init: function() {
        this.renderSide()
    },
    renderSide:function(){
        _side.render('user-center')
    },
}

$(function(){
    page.init()
})

