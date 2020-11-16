import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Breadcrumb,Table,Button,Input,InputNumber,Switch } from 'antd';
import Layout from 'common/layout';
import './index.css';
import {actionCreator} from './store';


// const columns = [ 
//   {
//     title: '分类名称',
//     dataIndex: 'name',
//     key: 'name',
//     width:'20%',
//     render:(name)=>{
//       return <Input 
//       style={{width:'80%'}}
//       defaultValue={name}
//       />
//     }
//   },
//   {
//     title: '手机分类名称',
//     dataIndex: 'mobileName',
//     key: 'mobileName',
//   },
//   {
//     title: '是否显示',
//     dataIndex: 'isShow',
//     key: 'isShow',
//   },
//   {
//     title: '排序',
//     dataIndex: 'order',
//     key: 'order',
//   }
// ];
class CategoryList extends Component {
    constructor(props){
        super(...props)
    }

    componentDidMount(){
      this.props.handleProductsPage(1)//请求第几页，不传后台默认请求第一页
    }

    render() {
      const { 
        list,
        current,
        total,
        pageSize,
        isFetching,
        handleIsShow,
        handleStatus,
        handleHot,
        handleUpdateOrder,

      } = this.props;

      const columns = [ 
        {
          title: '商品名称',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '是否首页显示',
          dataIndex: 'isShow',
          key: 'isShow',
          width:'20%',
          render:(isShow,record)=>{
            return <Switch
              checkedChildren="显示"
              unCheckedChildren="隐藏"
              checked={isShow == '0' ? false : true }
              onChange={
                (checked)=>{
                  handleIsShow(checked ? '1' : '0',record._id)
                }
              }
            />
          }
        },        
        {
          title: '上架/下架',
          dataIndex: 'status',
          key: 'status',
          width:'20%',
          render:(status,record)=>{
            return <Switch
              checkedChildren="上架"
              unCheckedChildren="下架"
              checked={status == '0' ? false : true }
              onChange={
                (checked)=>{
                  handleStatus(checked ? '1' : '0',record._id)
                }
              }
            />
          }
        },
        {
          title: '是否热卖',
          dataIndex: 'isHot',
          key: 'isHot',
          width:'20%',
          render:(isHot,record)=>{
            return <Switch
              checkedChildren="热卖"
              unCheckedChildren="滞销"
              checked={isHot == '0' ? false : true }
              onChange={
                (checked)=>{
                  handleHot(checked ? '1' : '0',record._id)
                }
              }
            />
          }
        },        
        {
          title: '排序',
          dataIndex: 'order',
          key: 'order',
          width:'20%',
          render:(order,record)=>{
            return <InputNumber 
            defaultValue={order}
            onBlur={
              (ev)=>{
                if(ev.target.value != order){
                  handleUpdateOrder(ev.target.value,record._id)
                }
              }
            }
            />
          }            
        },
        {
          title:'操作',
          dataIndex: 'handle',
          key: 'handle',          
        }
      ];

      const dataSource = list.map(list=>{
        return list
      }).toJS()
        return (
          <div className="User">
              <Layout>
                  <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>商品列表</Breadcrumb.Item>
                  </Breadcrumb>
                  <Link 
                    to="/product/add"
                    >
                    <Button 
                    className="addBtn"
                      type="primary" 
                      shape="round" 
                      >添加商品
                      </Button>
                    </Link>
                  <Table 
                    dataSource={dataSource} 
                    columns={columns}
                    rowKey='_id'
                    pagination={{
                      current:current,
                      total:total,
                      pageSize:pageSize
                    }}
                    onChange={//Table自带属性,点击触发打印pagination
                      (page)=>{
                        this.props.handleCategoriesList(page.current);
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
  isFetching:state.get('product').get('isFetching'),
  categories:state.get('product').get('categories'),
  list:state.get('product').get('list'),
  current:state.get('product').get('current'),
  total:state.get('product').get('total'),
  pageSize:state.get('product').get('pageSize'),
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
  handleProductsPage: (page) => {
    dispatch(actionCreator.getProductPageAction(page))
  },
  handleIsShow: (newShow,id) => {
    dispatch(actionCreator.handleIsShowAction(newShow,id))
  },
  handleStatus: (newStatus,id) => {
    dispatch(actionCreator.handleUpdateStatusAction(newStatus,id))
  },
  handleHot: (newHot,id) => {
    dispatch(actionCreator.handleUpdateHotAction(newHot,id))
  },  
  handleUpdateOrder: (newOrder,id) => {
    dispatch(actionCreator.handleUpdateOrderAction(newOrder,id))
  },
})
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);