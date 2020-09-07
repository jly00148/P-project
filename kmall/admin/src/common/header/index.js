import React,{ Component } from 'react';
import axios from 'axios';
import { Layout,Menu,Icon,Dropdown } from 'antd';
const { Header } = Layout;
import { getUsername,removeUsername } from 'util';
import './index.css';
  
class AdminHeader extends Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        axios({//发送ajax删除session
            method:'delete',
            url:'http://127.0.0.1:3000/session/users'
        })
        .then(result=>{//删除成功
            if(result.data.code === 0){
                removeUsername();//删除local Storage
                window.location.href = '/login';//回到登录页
            }
        })
        .catch(err=>{
            console.log("err::",err);
        })
    }
    render(){
        const menu = (
            <Menu onClick={this.handleLogout}>
                <Menu.Item key="1">
                    <Icon type="" />退出
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="AdminHeader">
                <Header className="header">
                    <div className="logo">
                        KMALL
                    </div>
                    <Dropdown overlay={ menu } trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                            {getUsername()} <Icon type="down" />
                        </a>
                        
                    </Dropdown>
                </Header>
            </div>
        )};
  };

export default AdminHeader;