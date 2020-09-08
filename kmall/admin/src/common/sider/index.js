import React,{ Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link,NavLink } from 'react-router-dom';
import { UserOutlined,HomeOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Sider } = Layout;
import './index.css';
  
class AdminSider extends Component{
    render(){
        return (
            <div className="AdminSider">
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        >
                        <Menu.Item key="1">
                            <HomeOutlined /> <NavLink exact to="/">首页</NavLink>{/*</NavLink>可以给点击选中的标签加class="active"并且刷新会固定页面*/}
                        </Menu.Item>
                        <Menu.Item key="2">
                            <UserOutlined /> <NavLink to="/user">用户管理</NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        )};
  };

export default AdminSider;