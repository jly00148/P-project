var api = require('api')
var hogan = require('hogan.js')
var _util = require('util')
var citys = require('util/city');
var modalBoxTpl = require('./modalBox.tpl')


module.exports = {
    show:function(){
        this.$elem = $('.modal-box')
        this.loadModal()
        this.bindEvent()

    },
    loadModal:function(){
        console.log(citys.getProvinces())
        console.log(citys.getCities('湖南省'))
        var html = _util.render(modalBoxTpl,{},hogan)
        this.$elem.html(html)
    },
    hideModal:function(){
        this.$elem.empty()
    },
    bindEvent:function(){
        var _this = this
        //关闭弹出地址
        this.$elem.on('click','.close',function(){
            _this.hideModal()
        })

        //阻止冒泡
        this.$elem.on('click','.modal-container',function(ev){
            ev.stopPropagation()
        })        
    }
}