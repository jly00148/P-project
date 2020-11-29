require('./index.css')
require('pages/common/logo')
require('pages/common/footer')
var _util = require('util')
var api = require('api')

var page = {
    init:function(){
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this;
        $('#btn-submit').on('click',function(){//点击登录框登录
            _this.submit()
        })
        $('input').on('keyup',function(ev){//回车键登录光标在账号密码框后按回车键触发ev.keyCode)
            if(ev.keyCode == 13){
                _this.submit()   
            }
        })
    },
    submit:function(){
        //1.触发数据
        var formData = {
            username:$.trim($('[name="username"]').val()),
            password:$.trim($('[name="password"]').val())
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

            api.login({
                method:'post',
                data:formData,
                dataType:'json',
                success:function(data){
                    window.location.href = '/user-center.html'
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
        if(!formData.username){
            result.msg = '账号不能为空'
            return result
        }else{//账号符合规范验证，密码同理
            if(!_util.validateFn(formData.username,'username')){
                result.msg = '请输入以首字母开头的4~7位账号'
                return result
            }
        }

        if(!formData.password){
            result.msg = '密码不能为空'
            return result
        }else{
            if(!_util.validateFn(formData.password,'password')){
                result.msg = '请输入字母、数字以及下划线4~7位密码'
                return result
            }
        }
        result.status = true;//账号密码符合规范改为true才可发送ajax
        return result     
    }
}
$(function(){
    page.init()
})