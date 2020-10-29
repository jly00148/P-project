import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Breadcrumb,Table } from 'antd'

import Layout from 'common/layout'

import "./index.css"
import { actionCreator } from './store'
// const dataSource = [
//   {
//     key: '1',
//     name: '胡彦斌',
//     age: 32,
//     address: '西湖区湖底公园1号',
//   },
//   {
//     key: '2',
//     name: '胡彦祖',
//     age: 42,
//     address: '西湖区湖底公园1号',
//   },
// ];

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
    render:(isAdmin)=>{//是布尔值费非字符串，需要在这用render方法根据布尔值显示相应想要的值
      return isAdmin ? '是' : '否'
    }
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
class User extends Component {
    constructor(props){
        super(...props)
    }
    componentDidMount(){
      this.props.handleUserList(1);
  }
    render() {
      const { list,current,total,pageSize,isFetching } = this.props;
      const dataSource = list.map(user=>{
          return {
              key:user.get('_id'),
              username:user.get('username'),
              isAdmin:user.get('isAdmin'),
              phone:user.get('phone'),
              email:user.get('email'),
              createdAt:user.get('createdAt')
          }
        }).toJS()//需要用toJS()方法转为数组

        return (
          <div className="User">
              <Layout>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                  </Breadcrumb>
                  <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={{
                      current:current,
                      total:total,
                      pageSize:pageSize
                    }}
                    onChange={//Table自带属性,点击触发打印pagination
                      (page)=>{
                        this.props.handleUserList(page.current);
                      }
                    }
                    loading={
                      {
                        spinning:isFetching,
                        tip:'数据正在玩命加载中...'
                      }
                    }
                    />
              </Layout>
          </div>
        );
    }
}

//映射属性到组件
const mapStateToProps = (state) => ({
    list:state.get('user').get('list'),
    current:state.get('user').get('current'),
    total:state.get('user').get('total'),
    pageSize:state.get('user').get('pageSize'),
    isFetching:state.get('user').get('isFetching')
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
  handleUserList: (values) => {
    dispatch(actionCreator.getUserListAction(values))
}
})

export default connect(mapStateToProps, mapDispatchToProps)(User)