var api = require('api')
var hogan = require('hogan.js')
var _util = require('util')
var district = require('util/district');
var modalBoxTpl = require('./modalBox.tpl')


module.exports = {
    show:function(){
        this.$elem = $('.modal-box')
        this.loadModal()
        this.bindEvent()
        this.loadProvinceOptions()

    },
    loadModal:function(){
        // citys.getProvinces()
        // citys.getCities()
        var html = _util.render(modalBoxTpl,{},hogan)
        this.$elem.html(html)
    },
    hideModal:function(){
        this.$elem.empty()
    },
    //遍历后的HTML插入到父节点内
    loadProvinceOptions:function(){
        var productHtml = this.loadProvince()
        $('.city-item').find('.province-select').html(productHtml)

    },
    loadCitysOptions:function(citys){
        $('.city-item').find('.city-select').html(citys)
    },
    //遍历省份
    loadProvince:function(){
        var _provinces = district.getProvinces()
        var html = '<option value="">请选择</option>'//第一行默认
        for(var i = 0;i<_provinces.length;i++){
            html+='<option value="'+_provinces[i]+'">'+_provinces[i]+'</option>'
        }
        return html
    },
    //遍历省份内的城市
    loadCitys:function(city){
        var citys = district.getCities(city)
        var html = '<option value="">请选择</option>'
        for(var i = 0;i<citys.length;i++){
            html+='<option value="'+citys[i]+'">'+citys[i]+'</option>'
        }
        return html
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
        
        //省份和城市联动
        this.$elem.on('change','.province-select',function(){
            var $this = $(this)
            var citys = _this.loadCitys($this.val())
            _this.loadCitysOptions(citys)//返回遍历成HTML直接插入到父元素中
        })
    }
}