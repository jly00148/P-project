import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select,Breadcrumb,Spin,InputNumber } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Option } = Select;
import UploadImage from 'common/upload-image';
import { actionCreator } from './store';
import Layout from 'common/layout';
import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DATAILIMAGES } from 'api/config.js';
import RichEditor from 'common/richEditor';

class ProductSave extends Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.state = {
            //组件加载完通过this.props.match.params.productId来获取参数即id值
            productId:this.props.match.params.productId
        }

    }

    componentDidMount(){
        this.props.handleLevelCategories()//进入添加商品页面要回传商品分类等级，不传参后台默认level=2,level是分类等级，2是第二等级
        if(this.state.productId){//查看数据回填页面，要知道查看回填是哪个数据必需传数据的id，如何获取id？见constructor函数
            this.props.getProductDetail(this.state.productId)
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            values.id = this.state.productId//点击把修改后的内容提交后台传id，方便发送dispatch的时候判断是修改还是添加商品发送ajax
            //err的错误来自form.item表单的rule,除了图片验证外，把err传递过去和图片已经图片详情一起验证，当form表单中任何一个内容没有输入即提示
            this.props.handleSave(err,values);
        });
      };

    handleSelectChange (value) {
        this.props.form.setFieldsValue({
        });
    };

    render(){
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        const { getFieldDecorator } = this.props.form;
        const { 
            //添加商品等一些操作
            isFetching,
            categories,
            handleMainImage,
            handleImages,
            handleDetail,
            validateStatus,
            help,
            validateStatus1,
            help1,
            
            //修改操作进入数据回填页面
            category,
            name,
            description,
            price,
            stock,
            detail,
            mainImage,
            images      
        } = this.props

        //处理图片回填
        const mainImageFileList = [];
        let imagesFileList = [];
        if(mainImage){//有回填的数据
            mainImageFileList.push({
                uid:'0',
                status:'done',
                url:mainImage,
                response:{
                    url:mainImage,
                    thumbUrl:mainImage,
                }//点击图片方法查看，下同
            })
        }

        if(images){
            imagesFileList = images.split(',').map((url,index)=>{
                return {
                    uid:index,
                    status:'done',
                    url:url,
                    response:{
                        thumbUrl:url,
                        url:url
                    }
                }
            })
        }

        return(
            <Layout className="content">
                <Spin 
                    indicator={antIcon}
                    spinning={isFetching}
                    tip='正在添加分类...'
                    className="loading"
                >
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>{this.state.productId ? '修改商品' : '添加商品'}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="container">
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 8 }}>
                        <Form.Item label="商品分类">
                            {
                                getFieldDecorator('category', {
                                rules: [
                                    { 
                                        required: true, message: '请输入需要添加的商品!' 
                                        }
                                    ],
                                    initialValue:category//initialValue是form的方法，设置表单一个初始值,才能显示看到修改的回填数据，下同
                                })(
                                    <Select
                                        placeholder="请输入根分类"
                                        onChange={this.handleSelectChange}
                                        >
                                        <Option value="0">根分类</Option>
                                        {
                                            categories.map((categories)=>{
                                                return  <Option 
                                                            key={categories.get('_id')} 
                                                            value={categories.get('_id')}
                                                            >
                                                            {categories.get('name')}
                                                        </Option>
                                                })
                                            }
                                    </Select>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="商品名称">
                            {
                                getFieldDecorator('name', {
                                rules: [
                                    { 
                                        required: true, message: '请输入商品名称!' ,
                                        }
                                    ],
                                    initialValue:name
                                }
                            )(<Input 
                                placeholder='请输入商品名称'
                                autoComplete="off"
                                />)
                            }
                        </Form.Item>

                        <Form.Item label="商品描述">
                            {
                                getFieldDecorator('description', {
                                rules: [
                                    { 
                                        required: true, message: '请输入商品描述!' ,
                                        }
                                    ],
                                    initialValue:description
                                }
                            )(<Input 
                                placeholder="请输入商品描述" 
                                autoComplete="off"
                                />)
                            }
                        </Form.Item>

                        <Form.Item label="商品库存">
                            {
                                getFieldDecorator('stock', {
                                rules: [
                                    { 
                                        required: true, message: '非有效字符!' ,
                                        pattern: new RegExp(/^[1-9]\d*$/, "g"),//只能输入数字
                                        }
                                    ],
                                    initialValue:stock
                                }
                            )(<Input
                                placeholder="商品价格" 
                                autoComplete="off"
                                />)
                            }
                        </Form.Item>

                        <Form.Item label="价格(元)">
                            {
                                getFieldDecorator('price', {
                                rules: [
                                    { 
                                        required: true, message: '非有效字符!' ,
                                        }
                                    ],
                                    initialValue:price
                                }
                            )(<InputNumber 
                                placeholder="商品价格" 
                                autoComplete="off"
                                min={0}
                                />)
                            }
                        </Form.Item>

                        <Form.Item label="封面图片" 
                        required={true}
                        validateStatus={validateStatus}//Form.Item验证方法，与上述验证方法不同
                        help={help}
                        >
                            <UploadImage max={1} 
                                fileList={mainImageFileList}
                                action={UPLOAD_PRODUCT_IMAGE} //图片存储的地址路由，下同
                                getFileList={
                                    (getFileList)=>{
                                        handleMainImage(getFileList)//得到图片地址发送dispatch更改reducer
                                        //后执行handleSubmit方法能够打地址添加商品的信息发送到后台，下同
                                    }
                                }
                            />
                        </Form.Item>

                        <Form.Item label="商品图片" 
                        required={true}
                        validateStatus={validateStatus1}
                        help={help1}                        
                        >
                            <UploadImage max={8} 
                                fileList={imagesFileList}
                                action={UPLOAD_PRODUCT_IMAGE} 
                                getFileList={
                                    (getFileList)=>{
                                        handleImages(getFileList)
                                    }
                                }
                            />
                        </Form.Item>

                        <Form.Item label="商品详情">
                            <RichEditor 
                                url={UPLOAD_PRODUCT_DATAILIMAGES}
                                getValue={
                                    (value)=>{
                                        handleDetail(value)
                                    }
                                }
                                values={detail}//商品详情回填传值到富文本
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 5 }} required={true}>
                            <Button 
                                type="primary" 
                                shape="round"
                                onClick={this.handleSubmit}
                            >
                            {this.state.productId ? '修改商品' : '添加商品'}
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Spin>
            </Layout>
        )
    }
}


const WrappedProductSave = Form.create({ name: 'coordinated' })(ProductSave);

//映射属性到组件
const mapStateToProps = (state) => ({
    //添加商品
    categories:state.get('product').get('categories'),
    isFetching:state.get('product').get('isFetching'),
    validateStatus:state.get('product').get('validateStatus'),
    help:state.get('product').get('help'),
    validateStatus1:state.get('product').get('validateStatus1'),
    help1:state.get('product').get('help1'),  

    //数据回填
    category:state.get('product').get('category'),
    name:state.get('product').get('name'),
    description:state.get('product').get('description'),
    price:state.get('product').get('price'),
    stock:state.get('product').get('stock'),
    detail:state.get('product').get('detail'),
    mainImage:state.get('product').get('mainImage'),
    images:state.get('product').get('images')
})

//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleSave:(err,values)=>{
        dispatch(actionCreator.productSaveAction(err,values));
    },
    handleMainImage:(getFileList)=>{
        dispatch(actionCreator.setMainImageAction(getFileList));
    },
    handleImages:(getFileList)=>{
        dispatch(actionCreator.setImagesAction(getFileList));
    },
    handleDetail:(values)=>{
        dispatch(actionCreator.setDetailAction(values));
    },            
    handleLevelCategories:(level)=>{
        dispatch(actionCreator.getLevelCategories(level))
    },
    getProductDetail:(productId)=>{
        dispatch(actionCreator.getProductDetailAction(productId))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductSave);