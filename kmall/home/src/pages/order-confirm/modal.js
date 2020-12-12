var api = require('api');
var hogan = require('hogan.js')
var _util = require('util')
var district = require('util/district');
var modalBoxTpl = require('./modalBox.tpl')

module.exports = {
    show:function(shipping){
        this.shipping = shipping;
        this.$elem = $('.modal-box')
        this.$shippingBox = $('.shipping-box')
        this.loadModal()
        this.bindEvent()
        this.loadProvinceOptions()
    },
    loadModal:function(){
        var html = _util.render(modalBoxTpl,{shipping:this.shipping},hogan)
        this.$elem.html(html)

    },
    hideModal:function(){
        this.$elem.empty()
    },
    //遍历后的HTML插入到父节点内
    loadProvinceOptions:function(){
        var provinceHtml = this.loadProvince()
        $('.city-item').find('.province-select').html(provinceHtml)

        if(this.shipping){  //编辑回填省份
            $('.province-select')
            .val(this.shipping.province)

            $('.city-select').
            html(this.editLoadCitys(this.shipping.province))//回填省份对应的所有城市
            .val(this.shipping.city)//回填value值
        }
    },
    editLoadCitys:function(city){
        return this.editAndAdd(city)
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
        return this.editAndAdd(city)
    },
    editAndAdd:function(city){
        var citys = district.getCities(city)
        var html = '<option value="">请选择</option>'
        for(var i = 0;i<citys.length;i++){
            html+='<option value="'+citys[i]+'">'+citys[i]+'</option>'
        }
        return html
    },
    submit:function(){
      //1.触发数据
      var formData = {
        name:$.trim($('[name="name"]').val()),
        province:$.trim($('[name="province"]').val()),
        city:$.trim($('[name="city"]').val()),
        address:$.trim($('[name="address"]').val()),
        phone:$.trim($('[name="phone"]').val()),
        zip:$.trim($('[name="zip"]').val())
    }
    
    //错误信息函数调用
    var formErr = {
        show:function(msg){
            $('.error-item')
                .show()
                .find('.error-msg')
                .text(msg)

        },
        hide:function(){
            $('.error-item')
                .hide()
                .find('.error-msg')
                .text('')
        },
    }
    //2.校验数据
    var validateResult = this.validate(formData);
    if(validateResult.status){
        //3.发送ajax
        formErr.hide()

        if(formData.username == 'admin'){//管理员
            formData.role = 'admin'
        }

        api.addShippings({
            method:'post',
            data:formData,
            dataType:'json',
            success:function(result){
                if(result.length >0){
                    _util.goResult('addMessage')
                }
            },
            error:function(msg){
                formErr.show(msg)
            }            
        })
    }else{//显示错误提示
        formErr.show(validateResult.msg)
    }        
    },
    validate:function(formData){
        let result = {
            status:false,
            msg:''
        }

        //账号为空验证，密码同理
        if(!formData.name){
            result.msg = '收货人姓名不能为空'
            return result
        }

        if(!formData.province){
            result.msg = '省份不能为空'
            return result
        }

        if(!formData.city){
            result.msg = '城市不能为空'
            return result
        }
        if(!formData.address){
            result.msg = '详细地址不能为空'
            return result
        }        
        if(!formData.phone){
            result.msg = '无效手机号'
            return result
        }else{
            if(!_util.validateFn(formData.phone,'phone')){
                result.msg = '请输入11位手机号'
                return result
            }
        }

        result.status = true;//账号密码符合规范改为true才可发送ajax
        return result     
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
            _this.loadCitysOptions(_this.loadCitys($this.val()))//返回遍历成HTML直接插入到父元素中
        })

        //提交验证
        $('#btn-submit').on('click',function(){
            _this.submit()
        })
        $('input').on('keyup',function(ev){//光标必需在input框内才触发
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
    }
}