module.exports = {
    validateFn:function(value,type){
        if(type == 'username'){
            return /^[a-z][a-z0-9_]{3,6}$/.test(value)
        }
        if(type == 'password'){
            return /^\w{4,7}$/.test(value)
        }
        if(type == 'phone'){
            return /^1[3|5|8|9]\d{9}$/.test(value)
        }    
        if(type == 'email'){
            return /^\w+@\w+\.\w{2,6}$/.test(value)
        }                    
    },
    showErrorMessage:(msg)=>{
        alert(msg)
    }
    ,getParamFromUrl:(key)=>{
        var query =window.location.search.substr(1)
        var reg = new RegExp('(^|&)'+key+'='+'([^&]*)(&|$)')
        var result = query.match(reg)
        return result ? decodeURIComponent(result[2]) : null
    },
    render:function(tpl,data,Hogan){
        var template = Hogan.compile(tpl);
        var html = template.render(data)
        return html
    },
    goResult:function(type){
        window.location.href = './result.html?type='+type
    },
    showConfirm:function(msg){
        return window.confirm(msg)
    }
}