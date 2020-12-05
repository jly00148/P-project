require('./index.css')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
var hogan = require('hogan.js')//commonJs引入
var api = require('api')
var _util = require('util')
var listTpl = require('./listTpl.tpl')

var page = {
    init:function(){
        this.loadProductsList(),
        this.bindEvent(),
        this.initPagination()
    },
    initPagination:function(){
        var _this = this
        this.$pagination = $('.pagination-box')
        this.$pagination.on('page-change',function(ev,page){
            _this.productsListParams.page = page
            _this.loadProductsList()
        })
        //初始化分页组件
        this.$pagination.pagination()
    },
    bindEvent:function(){
        var _this = this
        $('.sort-item').on('click',function(){
            var $this = $(this);

            //默认排序(按照商品添加顺序)
            if($this.hasClass('default')){
                if($this.hasClass('active')){
                    return//已经是active，下面同理
                }
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active');
                _this.productsListParams.orderBy = 'default'
            }
            //价格排序
            else{
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active');
                if($this.hasClass('asc')){//切换降序排序
                    $this.removeClass('asc')
                    .addClass('desc')
                    _this.productsListParams.orderBy = 'price_desc'
                }else if($this.hasClass('desc')){
                    $this.removeClass('desc')
                    .addClass('asc')//切换升序排序
                    _this.productsListParams.orderBy = 'price_asc'
                }
            }
            _this.productsListParams.page = 1;
            _this.loadProductsList()
        })
    },
    productsListParams:{
        category:_util.getParamFromUrl('categoryId'),
        keyword:_util.getParamFromUrl('keyword'),
        page:_util.getParamFromUrl('page') || 1,
        orderBy:_util.getParamFromUrl('orderBy') || 'default',
    },

    //轮播图左侧
    loadProductsList:function(){
        var _this = this
        api.getProductsList({
            data:this.productsListParams,
            success:function(result){
                if(result.list.length > 0){
                    var html = _util.render(listTpl,{list:result.list},hogan)
                    $('.product-list-box').html(html)
                    //渲染分页组件
                    _this.$pagination.pagination('render',{
                    current:result.current,
                    total:result.total,
                    pageSize:result.pageSize
                })
                }else{
                    $('.product-list-box').html('<p class="empty-message">真不巧，你的商品走丢了</p>')
                }
            }
        })
    },
}

$(function(){
    page.init()
})