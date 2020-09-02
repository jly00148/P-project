import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './index.css';
import  { actions } from './store/index.js';
import store from '../../store/index'



  
const NormalLoginForm = () => {
    const onFinish = values => {
      console.log('Received values of form: ', values);
    };
  
    return (
        <div className="Login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                >

                {/* 用户名 */}
                <Form.Item
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: '请输入用户名',
                        },
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
                <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
  };

const mapStateToProps = (state)=>{
    return {
        list:state.get('login').get('list'),
        task:state.get('login').get('task')
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handChange:(ev)=>{
            const task = ev.target.value;
            dispatch(actions.getChangeCreator(task))
        },
        handAdd:()=>{
            const payload = store.getState().task;
            dispatch(actions.getAddCreator(payload));

        },
        handDel:(index)=>{
            const payload = index;
            dispatch(actions.getDelCreator(payload))
        },
        handInitData:()=>{
            dispatch(actions.getRequestInitData())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NormalLoginForm);