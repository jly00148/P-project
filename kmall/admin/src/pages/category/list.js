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
      this.props.handleCategoriesList(1)//请求第几页，不传后台默认请求第一页
    }

    render() {
      const { 
        list,
        current,
        total,
        pageSize,
        isFetching,
        handleUpdateName,
        handleUpdateMobileName,
        handleUpdateOrder,
        handleIsShow
      } = this.props;

      const columns = [ 
        {
          title: '分类名称',
          dataIndex: 'name',
          key: 'name',
          width:'20%',
          render:(name,record)=>{
            return <Input 
            style={{width:'80%'}}
            defaultValue={name}
            onBlur={
              (ev)=>{
                if(ev.target.value != name){
                  handleUpdateName(ev.target.value,record._id)
                }
              }
            }
            />
          }
        },
        {
          title: '手机分类名称',
          dataIndex: 'mobileName',
          key: 'mobileName',
          width:'20%',
          render:(mobileName,record)=>{
            return <Input 
            defaultValue={mobileName}
            onBlur={
              (ev)=>{
                if(ev.target.value != mobileName){
                  handleUpdateMobileName(ev.target.value,record._id)
                }
              }
            }
            />
          }          
        },
        {
          title: '是否显示',
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
                    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                    <Breadcrumb.Item>分类列表</Breadcrumb.Item>
                  </Breadcrumb>

                  <div style={{marginBottom:10,height:40}} className="clearfix">
                      <Link 
                        style={{float:"right"}}
                        to="/category/add"
                        >
                        <Button 
                        className="addBtn"
                          type="primary" 
                          shape="round" 
                          >添加分类
                          </Button>
                      </Link>
                    </div>
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
  isFetching:state.get('category').get('isFetching'),
  categories:state.get('category').get('categories'),
  list:state.get('category').get('list'),
  current:state.get('category').get('current'),
  total:state.get('category').get('total'),
  pageSize:state.get('category').get('pageSize'),
})
//映射方法到组件
const mapDispatchToProps = (dispatch) => ({
  handleCategoriesList: (page) => {
    dispatch(actionCreator.getCategoriesListAction(page))
  },
  handleUpdateName: (name,id) => {
    dispatch(actionCreator.handleUpdateNameAction(name,id))
  },
  handleUpdateMobileName: (mobileName,id) => {
    dispatch(actionCreator.handleUpdateMobileNameAction(mobileName,id))
  },
  handleUpdateOrder: (newOrder,id) => {
    dispatch(actionCreator.handleUpdateOrderAction(newOrder,id))
  },
  handleIsShow: (checked,id) => {
    dispatch(actionCreator.handleIsShowAction(checked,id))
  }   
})
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);