var api_config = {
    login:['/sessions/users','post'],
    getUsername:['/sessions/username','get'],
    logout:['/sessions/users','delete'],
    register:['users','post'],
    checkUsername:['users/checkUsername','get'],
    getUseInfo:['sessions/users','get'],
    loadHomeCategory:['categories/homeCategories','get'],
    getPositionAds:['ads/positionAds','get'],
    getFloor:['floors','get'],
    getProductsList:['products/list','get']
}

module.exports = api_config;