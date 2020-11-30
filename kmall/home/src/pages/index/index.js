require('./index.css')
require('pages/common/search')
require('pages/common/nav')
require('pages/common/footer')
var hogan = require('hogan.js')
var api = require('api')
var tpl = require('./categoriesTpl.tpl')
var _util = require('util')


var page = {
    init:function(){
        this.loadHomeCategory()
    },
    loadHomeCategory:function(){
        api.loadHomeCategory({
            success:function(categories){
                var html = _util.render(tpl,{categories:categories},hogan)
                $('.categories').html(html)
            }
        })
    }
}
$(function(){
    page.init()
})