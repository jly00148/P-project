import React, { Component } from 'react'
import axios from 'axios';
import { Layout, Menu, Icon, Dropdown } from 'antd'
const { Header } = Layout;

import { getUsername,removeUsername } from 'util'

import "./index.css"

class AdminHeader extends Component {
    constructor(props){
        super(...props)
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(){
        axios({
            method: 'delete',
            url:'http://127.0.0.1:3000/sessions/users',
        })
        .then(result=>{
            if(result.data.code == 0){
                removeUsername()
                window.location.href = '/login'
            }
        })
        
    }
    render() {
        const menu = (
          <Menu>
            <Menu.Item key="1" onClick={this.handleLogout}>{/*  onClick={this.handleLogout}也可以添加在Menu标签里 */}
                <Icon type="logout"/> 退出
            </Menu.Item>
          </Menu>
        )     
        return (
            <div className="AdminHeader">
                <Header className="header">
                  <div className="logo">
                    KMALL
                  </div>
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a className="ant-dropdown-link" href="#">
                          {getUsername()} <Icon type="down" />
                        </a>
                    </Dropdown>
                </Header>
            </div>
        );
    }
}


export default AdminHeader