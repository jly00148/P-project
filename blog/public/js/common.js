(function(){
    var $register = $('#register');
    var $login = $('#login');

    //1.登录页面跳转到注册页面
    $('#go-register').on('click',function(){
        $register.show();
        $login.hide();
    })
    //1.2注册页面跳转到登录页面
    $('#go-login').on('click',function(){
        $register.hide();
        $login.show();
    })

    //2.用户注册：
    $('#sub-register').on('click',function(){
        //2.1获取表单数据：
        var username = $register.find('[name="username"]').val();
        var password = $register.find('[name="password"]').val();
        var repassword = $register.find('[name="repassword"]').val();

        //2.2验证：
        var $err = $register.find('.err');
        var errMsg = '';
        if(!/^[a-z][0-9a-z_]{2,9}$/i.test(username)){
            errMsg = '用户名以字母开头，3-10位';
        }
        else if(!/^\w{3,6}$/.test(password)){
            errMsg = '密码必需是字母、数字以及下划线密码3-6字符';
        }
        else if(password != repassword ){
            errMsg = '两次密码输入不一致';
        }

        if(errMsg){
            //验证不通过
            $err.html(errMsg);
            return;
        }else{
            //验证通过
            $.ajax({
                url:'/user/register',
                type:'post',
                dataType:'json',
                data:{
                    username:username,
                    password:password
                }
            })
            .done(function(result){
                // console.log(result);
                if(result.status == 10){
                    $err.html(result.msg);
                }else if(result.status == 0){
                    $err.html(result.msg);
                    setTimeout(function(){
                        $register.hide();
                        $login.show();
                    },1000)
                }else if(result.status == 20){
                    $err.html(result.msg);
                }
            })
            .fail(function(){
                $err.html('请求失败，请稍后再试!');
            })
        }
    })

})(jQuery)