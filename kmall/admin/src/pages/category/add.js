import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select,Breadcrumb,Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Option } = Select;
import { actionCreator } from './store'
import Layout from 'common/layout';

class CategoryAdd extends Component {
    constructor(props){
        super(...props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)

    }
    componentDidMount(){
        this.props.handleLevelCategories()//不传参后台默认level=2
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.handleAddCategory(values);
          }
        });
      };
    handleSelectChange (value) {
        this.props.form.setFieldsValue({
        });
    };

    render(){
        const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        const { getFieldDecorator } = this.props.form;
        const { isFetching,categories } = this.props

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
                        <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                        <Breadcrumb.Item>添加分类</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="container">
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 8 }}>
                        <Form.Item label="父级分类">
                            {
                                getFieldDecorator('pid', {
                                rules: [
                                    { 
                                        required: true, message: '请输入根分类!' 
                                        }
                                    ],
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

                        <Form.Item label="分类名称">
                            {
                                getFieldDecorator('name', {
                                rules: [
                                    { 
                                        required: true, message: '请输入分类名称!' ,
                                        }
                                    ],
                                }
                            )(<Input 
                                placeholder="请输入分类名称" 
                                autoComplete="off"
                                />)
                            }
                        </Form.Item>
                        <Form.Item label="手机分类名称">
                            {
                                getFieldDecorator('mobileName', {
                                rules: [
                                    { 
                                        required: true, message: '请输入手机分类名称!' ,
                                        }
                                    ],
                                }
                            )(<Input 
                                placeholder="请输入手机分类名称" 
                                autoComplete="off"
                                />)
                            }
                        </Form.Item>

                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                            <Button 
                                type="primary" 
                                shape="round"
                                onClick={this.handleSubmit}
                            >
                            添加分类
                            </Button>
                        </Form.Item>
                    </Form>
                    </div>
                </Spin>
            </Layout>
        )
    }
}


const WrappedCategoryAdd = Form.create({ name: 'coordinated' })(CategoryAdd);

//映射属性到组件
const mapStateToProps = (state) => ({
    isFetching:state.get('category').get('isFetching'),
    categories:state.get('category').get('categories')

})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleAddCategory:(values)=>{
        dispatch(actionCreator.getAddAction(values));
    },
    handleLevelCategories:(level)=>{
        dispatch(actionCreator.getLevelCategories(level))
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd);