;(function($){
    $.fn.extend({
        pagination:function(options){
            // console.log(options) {url: "/articles"}
            // console.log(this);  n.fn.init [nav#article-list, context: document, selector: "#article-list"]
            var _this = $(this); // _this是$('#article-list');
            _this.on('click','a',function(){
                var page = 1;
                var $this = $(this); // $this是点击的a标签
                var currentPage = _this.find('.active a').html();
                var labelText = $this.attr('aria-label'); // 获取属性

                if(labelText == 'Next'){
                    page = currentPage*1 + 1;
                }else if(labelText == 'Previous'){
                    page = currentPage - 1;
                }
                else{
                    page = $this.html();
                }
                if(page == currentPage || page <=0){
                    return false;
                }

                // 发送请求
                $.ajax({
                    url:options.url+'?page='+page, // /articles?page=1
                })
                .done(function(result){
                    if(result.status == 0){
                        // console.log(result);  {status: 0, data: "test"}
                        _this.trigger('get-data',result.data); // 传值result.data到common.js文件的$articlesPagination.on('get-data',function(ev,data)... ...
                    }
                })
                .fail(err=>{
                    console.log(err);
                })
            })
        }
    })
})(jQuery);