<div class="panel">
    <h2 class="panel-header">收件地址：</h2>
    <div class="pandel-body">
    {{#shippings}}
        <div class="shipping-item active" data-shipping-id="{{_id}}">                       
            <h3 class="shipping-title">收件人：{{name}}</h3>
            <p class="shipping-detail">
                收件地址：{{province}}{{address}}
            </p>
 
            <p class="shipping-detail">
                手机号码：{{phone}}
            </p>
            <p class="shipping-detail">
                邮编编号：{{zip}}
            </p>                                    
            <div class="shipping-footer">
                <span class="link shipping-edit">编辑</span>
                <span class="link shipping-delete">删除</span>
            </div>
        </div>
    {{/shippings}}    
        <div class="shipping-add">
            <i class="fa fa-plus"></i>
            <p class="shipping-add-text">添加新地址</p>
        </div>
    </div>
</div>