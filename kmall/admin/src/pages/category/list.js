import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb,Table,Button, Result } from 'antd';
import Layout from 'common/layout';
import './index.css';
import {actionCreator} from './store';


const columns = [ 
  {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '分类名称',
    dataIndex: 'mobileName',
    key: 'mobileName',
  },
  {
    title: '是否显示',
    dataIndex: 'isShow',
    key: 'isShow',
  },
  {
    title: '排序',
    dataIndex: 'order',
    key: 'order',
  }
];
class CategoryList extends Component {
    constructor(props){
        super(...props)
    }

    componentDidMount(){
      this.props.handleCategoriesList(1)//请求第几页，不传后台默认请求第一页
    }

    render() {
      const { list,current,total,pageSize,isFetching } = this.props;

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
                   <Button type="primary" shape="round" href="/category/add">添加分类</Button>
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
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);