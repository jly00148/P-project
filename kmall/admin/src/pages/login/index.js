import React,{ Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css';

// class NormalLoginForm extends React.Component {
class NormalLoginForm extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
            console.log('Received values of form: ', values);
        }
        });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className="Login">

            <Form  className="login-form"> 
            {/*去掉onSubmit={this.handleSubmit},采用登录按钮bind this */}
            {/* <Form onSubmit={this.handleSubmit} className="login-form"></Form> */} {/* 原代码 */}
            {/* <Form onSubmit={this.handleSubmit.bind(this)} className="login-form"> */} {/*在源代码基础上bind this */}

            {/* 用户名输入框 */}
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        />,
                    )}
                </Form.Item>

            {/* 密码输入框 */}
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        />,
                    )}
                </Form.Item>
                
            {/* 登录按钮 */}
                <Form.Item>
                {/* 删除多余的复选框，只留下按钮 */}
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a> */}
                    
                    {/* <Button type="primary" htmlType="submit" className="login-form-button"> */} {/* 登录按钮原代码 */}
                    <Button type="primary" onClick={this.handleSubmit.bind(this)} className="login-form-button"> {/* 去掉htmlType="submit",加上Form表单上的this.handleSubmit，在上面bind this */}
                        登录
                    </Button>
                    {/* Or <a href="">register now!</a> */}
                </Form.Item>
            </Form>
        </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default WrappedNormalLoginForm;