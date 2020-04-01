(function(){
    var $register = $('#register');
    var $login = $('#login');

    // 一：登录和注册页面相互跳转：
    //1.登录页面跳转到注册页面
    $('#go-register').on('click',function(){
        $register.show();
        $login.hide();
        $register.find('.err').html('')
    })
    //1.2注册页面跳转到登录页面
    $('#go-login').on('click',function(){
        $register.hide();
        $login.show();
    })


    // 二：用户注册发送给后台数据的逻辑
    //1.用户注册验证：
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

    // 三：用户登录发送给后台数据的逻辑
    $('#sub-login').on('click',function(){
        //1.2 获取表单数据：
        var username = $login.find('[name="username"]').val();
        var password = $login.find('[name="password"]').val();
        //1.3验证：
        var $err = $login.find('.err');
        var errMsg = '';
        if(!/^[a-z][0-9a-z_]{2,9}$/i.test(username)){
            errMsg = '用户名以字母开头，3-10位';
        }
        else if(!/^\w{3,6}$/.test(password)){
            errMsg = '密码必需是字母、数字以及下划线密码3-6字符';
        }

        if(errMsg){
            //验证不通过
            $err.html(errMsg);
            return;
        }else{
            //验证通过
            $.ajax({
                url:'/user/login',
                type:'post',
                dataType:'json',
                data:{
                    username:username,
                    password:password
                }
            })
            .done(function(result){
                // console.log(result);
                if(result.status == 0){
                    $err.html(result.msg);

                        // $login.hide();
                        // $('#user-info').hide();
                        // $('#user-info span').html(result.data.username);
                    setTimeout(function(){
                        window.location.reload(); 
                    },1000)
                }else if(result.status == 10){
                    $err.html(result.msg);
                }else if(result.status == 20){
                    $err.html(result.msg);
                }
            })
            .fail(function(){
                $err.html('请求失败，请稍后再试!');
            })            
        }
    })

    // 四：用户退出：
    $('#logout').on('click',function(){
        $.ajax({
            url:'/user/logout',
            type:'get'
        })
        .done(function(result){
            if(result.status == 0){ 
                window.location.href = '/';
            }
        })
        .fail(function(result){
            $('#user-info .err').html('服务器端错误,请稍后再试！');
        })
    })

    //文章列表分页
    var $articlesPagination = $('#article-list');
    $articlesPagination.on('get-data',function(ev,data){
        // console.log(data);
        // 1.构建文章列表
        // 2.构建分分页器
    })
    $articlesPagination.pagination({
        url:'/articles'
    })
})(jQuery)