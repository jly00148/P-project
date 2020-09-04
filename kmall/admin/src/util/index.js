//localStorage用法(需要进行别名配置:util)
export const saveUsername = (username)=>{//设置登录信息
    window.localStorage.setItem('username',username);
}

export const getUsername = (username)=>{//获取信息
    window.localStorage.getItem('username',username);
}

export const removeUsername = (username)=>{//删除信息
    window.localStorage.removeItem('username',username);
}