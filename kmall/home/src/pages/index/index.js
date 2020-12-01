import Swiper from 'swiper'; //ES引入
require('swiper/dist/css/swiper.min.css')
require('./index.css')
require('pages/common/search')
require('pages/common/nav')
require('pages/common/footer')
var hogan = require('hogan.js')//commonJs引入
var api = require('api')
var categoriesTpl = require('./categoriesTpl.tpl')
var swipersTpl = require('./swiperTpl.tpl')
var floorsTpl = require('./floorsTpl.tpl')
var _util = require('util')


var page = {
    init:function(){
        this.loadHomeCategory(),
        this.loadSwiper(),
        this.loadFloor()
    },

    //轮播图左侧
    loadHomeCategory:function(){
        api.loadHomeCategory({
            success:function(categories){
                var html = _util.render(categoriesTpl,{categories:categories},hogan)
                $('.categories').html(html)
            }
        })
    },

    //轮播图
    loadSwiper:function(){
        api.getPositionAds({
          success:function(ads){
            var html = _util.render(swipersTpl,{ads:ads},hogan);
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

        
    },

    //楼层
    loadFloor:function(){
      api.getFloor({
        success:function(floors){
            var html = _util.render(floorsTpl,{floors:floors},hogan)
            $('.floor-box').html(html)
        }
      })
    }
}

$(function(){
    page.init()
})