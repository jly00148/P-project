import Swiper from 'swiper'; //ES引入
require('swiper/dist/css/swiper.min.css')
require('./index.css')
require('pages/common/search')
require('pages/common/nav')
require('pages/common/footer')
var hogan = require('hogan.js')//commonJs引入
var api = require('api')
var categoriesTpl = require('./categoriesTpl.tpl')
var swiperTpl = require('./swiperTpl.tpl')
var _util = require('util')


var page = {
    init:function(){
        this.loadHomeCategory(),
        this.swiper()
    },
    loadHomeCategory:function(){
        api.loadHomeCategory({
            success:function(categories){
                var html = _util.render(categoriesTpl,{categories:categories},hogan)
                $('.categories').html(html)
            }
        })
    },
    swiper:function(){
 

        api.getPositionAds({
          success:function(ads){
            var html = _util.render(swiperTpl,{ads:ads},hogan);
              $('.swiper-container .swiper-wrapper').html(html)
              var mySwiper = new Swiper ('.swiper-container', {
                autoplay:true,//等同于以下设置
                  autoplay: {
                  delay: 2000,
                  stopOnLastSlide: false,
                  disableOnInteraction: false,
                  },
                  // direction: 'vertical', // 垂直切换选项
                  loop: true, // 循环模式选项
                  
                  // 如果需要分页器
                  pagination: {
                    el: '.swiper-pagination',
                    clickable:true
                  },
                  
                  // 如果需要前进后退按钮
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                })
          }
        })

        
    }
}

$(function(){
    page.init()
})