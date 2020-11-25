require('./index.css')
require('pages/common/logo')
const _util = require('util')
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
        //2.校验数据
        var validateResult = this.validate(formData);
        if(validateResult.status){
         //3.发送ajax
         $('.error-item')
         .hide()//符合规范后把错误隐藏
         .find('.error-msg')
         .text('')

         $.ajax({
             url:'/sessions/users',
             method:'post',
             data:formData,
             dataType:'json',
             success:function(result){
                 console.log('success',result)
             },
             error:function(err){
                console.log('err!!',err)
            }             
         })
        }else{//显示错误提示
            $('.error-item')
            .show()
            .find('.error-msg')
            .text(validateResult.msg)
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