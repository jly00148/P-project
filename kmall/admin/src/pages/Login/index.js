import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './index.css';
import  { actions } from './store/index.js';
import store from '../../store/index'



  
// const NormalLoginForm = () => {
class NormalLoginForm extends Component{
    constructor(props){
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }
     onFinish(values){
        this.props.handleLogin(values);
    };
  
    render(){
        return (
            <div className="Login">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={this.onFinish}
                    >

                    {/* 用户名 */}
                    <Form.Item
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: '请输入用户名',
                            },
                            {pattern:/^[a-z][a-z0-9_]{3,6}$/,message:'首字母必需是字母，3至6位'}
                        ]}
                        >
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="用户名" 
                        autoComplete="off"

                        />
                    </Form.Item>

                    {/* 密码 */}
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {pattern:/^[a-z0-9]{3,6}$/,message:'密码3至6位'}
                        ]}
                        >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            autoComplete='off'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>保存密码</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href="">
                        忘记密码？
                        </a>
                    </Form.Item>
            
                    {/* 登录按钮 */}
                    <Form.Item>
                    <Button type="primary"  htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        )};
  };

const mapStateToProps = (state)=>{
    return {
        list:state.get('login').get('list'),
        task:state.get('login').get('task')
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handleLogin:(values)=>{
            dispatch(actions.getLoginAction(values));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NormalLoginForm);