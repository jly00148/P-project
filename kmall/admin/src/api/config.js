export const SERVER = 'http://127.0.0.1:3000';
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images';
export const UPLOAD_PRODUCT_DATAILIMAGES = SERVER + '/products/detailImages';

export const API_CONFIG = {
    login:['/sessions/users','post'],//登录
    logout:['/sessions/users','delete'],//退出
    count:['/counts/','get'],
    getUsersList:['/users/list','get'],
    addCategories:['/categories','post'],
    getLevelCategories:['/categories/levelCategories','get'],
    getCategoriesList:['/categories/list','get'],
    updateCategoriesList:['/categories/name','put'],
    updateCategoriesMobileList:['/categories/mobileName','put'],
    updateCategoriesOrderList:['/categories/order','put'],
    updateCategoriesIsShowList:['/categories/isShow','put'],
    addProducts:['/products','post'],
    getProductPage:['/products/list','get'],
    getProductIdDetail:['/products/detail','get'],
    updateProductsIsShowList:['/products/isShow','put'],
    updateProductsStatusList:['/products/status','put'],
    updateProductsisHotList:['/products/isHot','put'],
    updateProductsOrderList:['/products/order','put'],
    updateProducts:['/products','put']
}