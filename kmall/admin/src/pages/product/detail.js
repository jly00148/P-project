import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select,Breadcrumb,InputNumber } from 'antd';
import { actionCreator } from './store';
import Layout from 'common/layout';

class ProductDetail extends Component {
    constructor(props){
        super(props)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.state = {
            //组件加载完通过this.props.match.params.productId来获取参数即id值
            productId:this.props.match.params.productId
        }

    }

    componentDidMount(){
        if(this.state.productId){//查看数据回填页面，要知道查看回填是哪个数据必需传数据的id，如何获取id？见constructor函数
            this.props.getProductDetail(this.state.productId)
        }
    }

    handleSelectChange (value) {
        this.props.form.setFieldsValue({
        });
    };

    render(){
        const { 
            categoryName,
            name,
            description,
            price,
            stock,
            detail,
            mainImage,
            images
        } = this.props;

        let imagesBox = null;
        if(images){
            imagesBox = images.split(',').map((url,index)=>{
                return (<li key={index}>
                <img src={url} />
                </li>)
            })
        }

        return(
            <Layout className="content">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                        <Breadcrumb.Item>查看商品</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="container">
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 8 }}>
                        <Form.Item label="商品分类">
                            <Input value={categoryName} disabled={true}/>
                        </Form.Item>

                        <Form.Item label="商品名称">
                            <Input value={name} disabled={true} />
                        </Form.Item>

                        <Form.Item label="商品描述">
                            <Input value={description} disabled={true}/>
                        </Form.Item>

                        <Form.Item label="商品库存">
                            <InputNumber value={stock} disabled={true} />
                        </Form.Item>

                        <Form.Item label="价格(元)">
                            <InputNumber value={price} disabled={true} />
                        </Form.Item>

                        <Form.Item label="封面图片" >
                            {
                                mainImage ? <ul className="imgBox"><li><img src={mainImage} /></li></ul> : null
                            }
                        </Form.Item>

                        <Form.Item label="商品图片" >
                            <ul className="imgBox">{imagesBox}</ul>
                        </Form.Item>

                        <Form.Item label="商品详情">
                            <div dangerouslySetInnerHTML={{__html:detail}}></div>{/* detail是数据库存的是标签字符串，用次方法转成标签 */}
                        </Form.Item>
                    </Form>
                    </div>
            </Layout>
        )
    }
}


const WrappedProductDetail = Form.create({ name: 'coordinated' })(ProductDetail);

//映射属性到组件
const mapStateToProps = (state) => ({
    //数据回填
    categoryName:state.get('product').get('categoryName'),
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

export default connect(mapStateToProps,mapDispatchToProps)(WrappedProductDetail);