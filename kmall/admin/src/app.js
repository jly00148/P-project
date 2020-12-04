import React, { Component } from 'react';
import './App.css';
import { 
    BrowserRouter as Router, 
    Route, 
    Link,
    Switch,
    Redirect,//路由重定向
} from "react-router-dom";//h5路由会向后台发送请求,配制文件添加historyApiFallback:true

// import {
//     HashRouter as Router,Route, Link 
//  } from 'react-router-dom';//hash路由并不会向后台发送请求

import Login from 'pages/login';//别名配制
import Home from 'pages/home';
import User from 'pages/user';
import Category from 'pages/category';
import Product from 'pages/product';
import Ad from 'pages/ad';
import Err from 'common/err';//引入路由访问无效页面组件
import { getUsername } from 'util';//获取用户名(getUsername要return)

class App extends Component {
    render() {
        // 处理在主页home中如果local Storage用户消失就会去登录，否则没有消失就禁止去登录停在home主页
        const ProtectRoute = ({component:Component,...rest})=>(<Route 
            {...rest}
            render={(props)=>{
                return getUsername() ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />)
        // 在home主页访问/login路由，如果有用户的那么禁止去login登录页面，否则去login登录页面
        const LoginRoute = ({component:Component,...rest})=>(<Route 
            {...rest}
            render={(props)=>{
                return getUsername() ? <Redirect to="/" />  : <Component {...props} />
            }}
        />)
                       
        return (
            <Router forceRefresh={true}>
                <div className="App">
                    <Switch>{/* 加Switch的目的是匹配/就不往下匹配了，不然无效页面后去访问主页会出现err页面提示信息 */}  
                        <ProtectRoute exact path="/" component={Home} />
                        <LoginRoute exact path="/login" component={Login} />
                        <ProtectRoute path="/user" component={User} />
                        <ProtectRoute path="/category" component={Category} />
                        <ProtectRoute path="/product" component={Product} />
                        <ProtectRoute path="/ad" component={Ad} />
                        <Route component={Err} />{/* 不加路径是代表所有，所以也包括主页路径/ */}
                    </Switch>
                </div>
            </Router>
        )          
    }
}


export default App;