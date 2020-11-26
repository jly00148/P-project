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
}