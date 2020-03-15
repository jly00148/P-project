const crypto = require('crypto'); // 引入加密对象

// 1. 根据算法生成hash对象,md5,sha256,sha512是算法
// const hash = crypto.createHash('md5'); 
// const hash = crypto.createHash('sha256'); 
// const hash = crypto.createHash('sha512'); 



 // 2、添加明文：hash对象对'a123'明文加密
 //     hash.update('a123');

// 3. 生成密文：生成16进制数
// console.log(hash.digest('hex')); // 80c9ef0fb86369cd25f90af27ef53a9e



//建议采用以下方法：

// 2.根据算法生成hmac对象
// const hmac = crypto.createHmac('sha512','secret word');// 前者参数是算法，后者是岩，黑客无法攻破

// 添加明文：
//hmac.update('a123');

// 2.1 生成密文：
// console.log(hmac.digest('hex'));
// c89faf8f213539f5d64840726bf803e97d8c7123a8fe7ddce3b368311275f8d0f9ce3702e4e10f9addcaef5b2925583b156dd5100ff8f200e99c6cc3e1e94256



module.exports = (str)=>{
    const hmac = crypto.createHmac('sha512','secret word');
    hmac.update(str);
    return hmac.digest('hex');
}