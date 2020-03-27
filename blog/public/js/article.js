;(function($){
    ClassicEditor
    .create(document.querySelector('#content'),{
        language:'zh-cn', // 富文本预选标题显示中文
        ckfinder:{
            uploadUrl:'/admin/uploadImage' //富文本能后上传图片
        }
    })
    .catch(error=>{
        console.error(error);
    })
})(jQuery);

