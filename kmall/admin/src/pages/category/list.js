import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb,Table,Button } from 'antd';

import Layout from 'common/layout';

import "./index.css";


const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '是否管理员',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
  },
  {
    title: 'email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '注册时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
  },  
];
class CategoryList extends Component {
    constructor(props){
        super(...props)
    }

    render() {
      const dataSource = []
        return (
          <div className="User">
              <Layout>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                    <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                  </Breadcrumb>
                   <Button type="primary" shape="round" href="/category/add">添加分类</Button>
                  <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    />
              </Layout>
          </div>
        );
    }
}

//映射属性到组件
const mapStateToProps = (state) => ({

})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)