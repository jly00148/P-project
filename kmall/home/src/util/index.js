module.exports = {
    validateFn:function(value,type){
        if(type == 'username'){
            return /^[a-z][a-z0-9_]{3,6}$/.test(value)
        }
        if(type == 'password'){
            return /^\w{4,7}$/.test(value)
        }        
    }
}