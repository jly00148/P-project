import React,{ Component } from 'react';
import { Layout, Breadcrumb,Card,Row,Col } from 'antd';
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
                            <Breadcrumb.Item>首页内容</Breadcrumb.Item>
                            </Breadcrumb>
                            <div className="content">
                            <Row>
                                <Col span={4}>
                                    <Card title="用户数" bordered={false} style={{ width:300 }}>
                                        af
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card title="商品数" bordered={false} style={{ width:300 }}>
                                        af
                                    </Card>
                                </Col>
                                <Col span={4}>
                                    <Card title="订单数" bordered={false} style={{ width:300 }}>
                                        af
                                    </Card>
                                </Col>                                                                
                            </Row>
                            </div>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )};
  };

export default AdminLayout;