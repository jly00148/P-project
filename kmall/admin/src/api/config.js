export const SERVER = 'http://127.0.0.1:3000';

export const API_CONFIG = {
    login:['/sessions/users','post'],//登录
    logout:['/sessions/users','delete'],//退出
    count:['/counts/','get'],//请求数据库资源
    getUsersList:['/users/list','get']//请求数据库资源
}