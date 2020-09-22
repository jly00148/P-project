// import React, { Component } from 'react';
// import { 
//     BrowserRouter as Router,
//     Route, 
//     Redirect,//路由重定向
//     Switch
// } from 'react-router-dom';//h5路由会向后台发送请求,配制文件添加historyApiFallback:true
// // import { HashRouter as Router,Route, Link } from 'react-router-dom';//hash路由并不会向后台发送请求
// import Login from 'pages/login';//别名配制
// import Home from 'pages/home';
// import { getUsername } from 'util';//获取用户名(getUsername要return)
// import Err from 'common/err';//引入路由访问无效页面组件


// class App extends Component{
//     render(){

//         // 处理在主页home中如果local Storage用户消失就会去登录，否则没有消失就禁止去登录停在home主页
//         const ProtectLogin = ({component:Component,...rest})=> (<Route
//             {...rest}
//             render={(props)=>{
//                 return getUsername() ? <Component {...props} /> : <Redirect to="/login" />
//             }}
//         />)

//         // 在home主页访问/login路由，如果有用户的那么禁止去login登录页面，否则去login登录页面
//         const ProtectHome = ({component:Component,...rest})=> (<Route
//             {...rest}
//             render={(props)=>{
//                 return getUsername() ? <Redirect to="/" /> : <Component {...props} />
//             }}
//         />)

//         return(
//             <Router>
//                 <div>
//                     <Switch>{/* 加Switch的目的是匹配/就不往下匹配了，不然无效页面后去访问主页会出现err页面提示信息 */}                                                   
//                         <ProtectLogin exact path="/"  component={Home} />
//                         <ProtectLogin exact path="/user"  component={Home} />
//                         <ProtectHome path="/login" component={Login} />
//                         <Route component={Err}/>{/* 不加路径是代表所有，所以也包括主页路径/ */}
//                     </Switch>
//                 </div>
//             </Router>
//         )
//     }
// }



import React, { Component } from 'react'
import './App.css'

import { 
    BrowserRouter as Router, 
    Route, 
    Link,
    Switch,
    Redirect,
} from "react-router-dom"

import Login from 'pages/login'
import Home from 'pages/home'
import Err from 'common/err'

import { getUsername } from 'util'

class App extends Component {    
    render() {
        const ProtectRoute = ({component:Component,...rest})=>(<Route 
            {...rest}
            render={(props)=>{
                return getUsername() ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />)
        const LoginRoute = ({component:Component,...rest})=>(<Route 
            {...rest}
            render={(props)=>{
                return getUsername() ? <Redirect to="/" />  : <Component {...props} />
            }}
        />)
        return (
            <Router forceRefresh={true}>
                <div className="App">
                    <Switch>
                        <ProtectRoute exact path="/" component={Home} />
                        <LoginRoute path="/login" component={Login} />
                        <Route component={Err} />
                    </Switch>
                </div>
            </Router>
        )          
    }
}


export default App;