import React,{ Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
const {  Content } = Layout;
import AdminHeader from '../header/index.js';
import AdminSider from '../sider/index.js';
import './index.css';
  
class AdminLayout extends Component{
    render(){
        return (
            <div className="Layout">
                <Layout>
                <AdminHeader />
                    <Layout>
                        <AdminSider />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                            </Breadcrumb>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                                >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )};
  };

export default AdminLayout;