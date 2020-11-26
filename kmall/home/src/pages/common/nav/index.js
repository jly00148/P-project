require('./index.css')
var api = require('api')
var _util = require('util')
var page = {
    init:function(){
        this.loadUsername()
        this.bindEvent()
    },
    bindEvent:function(){
        $('#logout').on('click',function(){
            api.logout({
                success:function(){
                    window.location.reload()
                },
                error:function(){
                    _util.showErrorMessage('网络错误，请稍后再试')
                }
            })
        })
    },
    loadUsername:function(){
        api.getUsername({
            success:function(data){
                $('.not-login')
                .hide()
                
                $('.login')
                .show()
                .find('.username')
                .text(data.username)
            },
        })
    }
}



module.exports=page.init()