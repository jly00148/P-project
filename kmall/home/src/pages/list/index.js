require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
var hogan = require('hogan.js')//commonJs引入
var api = require('api')

var _util = require('util')


var page = {
    init:function(){
        this.loadProductList()
    },

    //轮播图左侧
    loadProductList:function(){

    },
}

$(function(){
    page.init()
})