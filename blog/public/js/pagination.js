;(function($){
    $.fn.extend({
        pagination:function(options){
            // console.log(options) {url: "/articles"}
            // console.log(this);  n.fn.init [nav#article-list, context: document, selector: "#article-list"]
            this.on('click','a',function(){
                var page = 1;
                var $this = $(this);
                var currentPage = $this.html();
                console.log(currentPage);

                var labelText = $this.attr('aria-label');
                if(labelText == 'Next'){
                    page = currentPage*1 + 1;
                }else if(labelText == 'Previous'){
                    page = currentPage - 1;
                }
                else{
                    page = currentPage;
                }
                console.log(page);

                if(currentPage == page){
                    return false;
                }
            })
        }
    })
})(jQuery);