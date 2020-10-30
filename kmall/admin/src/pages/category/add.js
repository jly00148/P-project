import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select,Breadcrumb } from 'antd';
const { Option } = Select;
import { actionCreator } from './store'
import Layout from 'common/layout';


class CategoryAdd extends Component {
    constructor(props){
        super(...props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)

    }    
    handleSubmit(e) {
        
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.handleAddCategory(values);
          }
        });
      };
    handleSelectChange (value) {
        this.props.form.setFieldsValue({
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>添加分类</Breadcrumb.Item>
                </Breadcrumb>
                <Form labelCol={{ span: 5 }} wrapperCol={{ span: 6 }}>
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
                           提交
                        </Button>
                    </Form.Item>
                </Form>                             
            </Layout>
        )
    }
}


const WrappedCategoryAdd = Form.create({ name: 'coordinated' })(CategoryAdd);

//映射属性到组件
const mapStateToProps = (state) => ({

})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
    handleAddCategory:(values)=>{
        dispatch(actionCreator.getAddAction(values));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(WrappedCategoryAdd);