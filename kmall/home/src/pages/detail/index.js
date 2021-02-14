require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var hogan = require('hogan.js')
var api = require('api')
var _util = require('util')
var detailTpl = require('./detailTpl.tpl')

var page = {
    init:function(){
        this.$elem = $('.detail-box')
        this.ProductsDetail(),
        this.bindEvent()
    },
    bindEvent:function(){
        var _this = this;
        //图片切换(事件代理),下同
        this.$elem.on('click','.product-small-img-item',function(){
            var $this = $(this)

            //小图片样式切换
            $this.addClass('active')
            .siblings('.product-small-img-item').removeClass('active')

            //大图跟随小图切换
            var imgSrc = $this.find('img').attr('src')
            $('.product-main-img img').attr('src',imgSrc)
            $('.big-img img').attr('src',imgSrc)
        })

        //处理购买数量
        this.$elem.on('click','.count-btn',function(){
            var $this = $(this)
            var $input = $('.count-input')
            var current = parseInt($input.val())
            if($this.hasClass('plus')){
                $input.val(current == _this.stock ?  _this.stock : current+1)
            }else{
                $input.val(current == 1 ? 1 : current-1)
            }
        })

        //添加购物车
        this.$elem.on('click','.add-cart-btn',function(){
            api.addCarts({
                data:{
                    productId:_this.productsDetailParams.id,
                    count:$('.count-input').val()
                },
                success:function(){
                    _util.goResult('addCart')
                }
            })
        })

        //处理放大镜(鼠标进入)
        this.$elem.on('mousemove','.product-main-img',function(ev){
            $('.mask').css('display','block')
            $('.big-img').css('display','block')

            var l = ev.clientX - $('.product-main-img').offset().left - $('.mask').innerWidth() * 0.5;
            var t = ev.clientY - $('.product-main-img').offset().top - $('.mask').innerHeight() * 0.5;
            var w = $('.product-main-img').innerWidth() - $('.mask').innerWidth();
            var h = $('.product-main-img').innerHeight() - $('.mask').innerHeight();
            
            if(l < 0){
                l = 0;
            }else if(l > w){
                l = w;
            }


            if(t < 0){
                t = 0;
            }else if(t > h){
                t = h;
            }

            $('.mask').css('left',l+'px');
            $('.mask').css('top',t+'px');
            
            var percentX = l / ($('.product-main-img').innerWidth() - $('.mask').innerWidth());
            var percentY = t / ($('.product-main-img').innerHeight() - $('.mask').innerHeight());
            $('.bigImg').css('left',-300 * percentX+'px')
            $('.bigImg').css('top',-300 * percentY+'px')

        })
        //处理放大镜(鼠标离开)
        this.$elem.on('mouseout','.product-img',function(ev){
            $('.mask').css('display','none')
            $('.big-img').css('display','none')
        })        
    },
    productsDetailParams:{
        id:_util.getParamFromUrl('productId'),
    },

    //轮播图左侧
    ProductsDetail:function(){
        var _this = this
        api.getProductsDetail({
            data:this.productsDetailParams,
            success:function(product){
                if(product){
                    _this.stock = product.stock;//处理购物数量上限和下限
                    product.images = product.images.split(',')
                    product.activeImage = product.images[0]
                    var html = _util.render(detailTpl,product,hogan)
                    _this.$elem.html(html)
                }else{
                    _this.$elem.html('<p class="empty-message">真不巧，你的商品走丢了</p>')
                }
            }
        })
    },
}

$(function(){
    page.init()
})