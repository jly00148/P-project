import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb,Table } from 'antd';

import Layout from 'common/layout';
import "./index.css";
import { actionCreator } from './store';
import { get } from 'immutable';

// const dataSource = [
//   {
//     key:'1',
//     name:'前端',
//     age:18,
//     address:'西湖公园',
//   },
//   {
//     key:'2',
//     name:'后端',
//     age:18,
//     address:'西湖公园',
//   }
// ];

const columns = [
  {
    title:'用户名',
    dataIndex:'username',
    key:'username'
  },
  {
    title:'是否管理员',
    dataIndex:'isAdmin',
    key:'isAdmin',
    render:(isAdmin)=>{return isAdmin ? '是' : '否'}
  },
  {
    title:'email',
    dataIndex:'email',
    key:'email'
  },
  {
    title:'手机号',
    dataIndex:'phone',
    key:'phone'
  },
  {
    title:'注册时间',
    dataIndex:'createdAt',
    key:'createdAt'
  }
]

class User extends Component {
    constructor(props){
        super(...props)
    }

    render() {
        const { list } = this.props;
        // console.log(list); 拿到的数据应该是immutable数据，需要转换成数组
        const dataSource = list.map(user=>{//数组map方法：遍历循环数组并且把每一项返回出去，直到返回新的数组
          // console.log(user);还是immutable数据如何获取？
          return {
              key:user.get('_id'),//需要添加唯一的key
              username:user.get('username'),
              isAdmin:user.get('isAdmin'),
              phone:user.get('phone'),
              email:user.get('email'),
              createdAt:user.get('createdAt'),
            }
        }).toJS()


        return (
          <div className="Home">
              <Layout>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                      <Breadcrumb.Item>首页</Breadcrumb.Item>
                      <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                      <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                  </Breadcrumb>
                  <div className="content">
                    <Table dataSource={dataSource} columns={columns} />
                  </div>
              </Layout>
          </div>
          );
    }
}

//映射属性到组件
const mapStateToProps = (state) => ({
    list:state.get('user').get('list')
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(User)