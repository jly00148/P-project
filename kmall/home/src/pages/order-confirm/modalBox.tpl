<div class="modal close"><!--close是点击非地址面板处隐藏地址面板-->
    <div class="modal-container">
        <div class="modal-header">
            {{#shipping._id}}
                <h2 class="modal-title">编辑地址</h2>
            {{/shipping._id}}
            {{^shipping._id}}
                <h2 class="modal-title">新增地址</h2>
            {{/shipping._id}}
            <i class="fa fa-close close-icon close"></i>
        </div>
        <div class="modal-body">
            <div class="form">
                <div class="form-box">
                    <div class="error-item">
                        <i class="fa fa-minus-circle error-icon"></i>
                        <p class="error-msg">error</p>
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-user"></i>
                        </label>
                        <input type="text" class="form-content" name="name"  autoComplete="off" value="{{shipping.name}}" placeholder="请输入收货人姓名" >
                    </div>
                    <div class="form-item city-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-building"></i>
                        </label>
                        <select name="province" class="province-select" id="province-select">
                        </select>
                        <select name="city" class="city-select">
                            <option value="">请选择</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-map-marker"></i>
                        </label>
                        <input type="text" class="form-content" name="address" value="{{shipping.address}}" placeholder="请输入详细地址到/乡政/街道/门牌号" autoComplete="off">
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-phone"></i>
                        </label>
                        <input type="text" class="form-content" name="phone" value="{{shipping.phone}}" placeholder="请输入手机号" >
                    </div>
                    <div class="form-item">
                        <label for="" class="form-lable">
                            <i class="fa fa-envelope"></i>
                        </label>
                        <input type="text" class="form-content" name="zip" value="{{shipping.zip}}" placeholder="请输入邮编,如100001" >
                    </div>
                    {{#shipping._id}} 
                        <div class="btn-item">
                            <a href="javascript:;" class="btn btn-submit" id="btn-submit">修改</a>
                        </div>  
                    {{/shipping._id}}
                   {{^shipping._id}}
                        <div class="btn-item">
                            <a href="javascript:;" class="btn btn-submit" id="btn-submit">添加</a>
                        </div>  
                    {{/shipping._id}}                    
                </div>                              
            </div>
        </div>
    </div>
</div>