var api_config = {
    login:['/sessions/users','post'],
    getUsername:['/sessions/username','get'],
    logout:['/sessions/users','delete'],
    register:['users','post'],
    checkUsername:['users/checkUsername','get'],
    getUseInfo:['sessions/users','get'],
    loadHomeCategory:['categories/homeCategories','get']
}

module.exports = api_config;