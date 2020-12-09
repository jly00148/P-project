var api_config = {
    login:['/sessions/users','post'],
    getUsername:['/sessions/username','get'],
    logout:['/sessions/users','delete'],
    register:['/users','post'],
    checkUsername:['/users/checkUsername','get'],
    getUseInfo:['/sessions/users','get'],
    loadHomeCategory:['/categories/homeCategories','get'],
    getPositionAds:['ads/positionAds','get'],
    getFloor:['/floors','get'],
    getProductsList:['/products/list','get'],
    getProductsDetail:['/products/detail','get'],
    addCarts:['/carts','post'],
    getCartsCount:['/carts/count','get'],
    getCarts:['/carts','get'],
    updateCartsChoices:['/carts/choices','put'],
    deleteCarts:['/carts','delete'],
    updateCartsCounts:['/carts/counts','put']

}

module.exports = api_config;