import React, { Component } from 'react';
import { 
    BrowserRouter as Router,
    Route, 
    Redirect//路由重定向
} from 'react-router-dom';//h5路由会向后台发送请求,配制文件添加historyApiFallback:true
// import { HashRouter as Router,Route, Link } from 'react-router-dom';//hash路由并不会向后台发送请求
import Login from 'pages/login';//别名配制
import Home from 'pages/home';
import { getUsername } from 'util';//获取用户名(getUsername要return)

class App extends Component{
    render(){
        const ProtectLogin = ({component:Component,...rest})=> (<Route
            {...rest}
            render={(props)=>{
                return getUsername() ? <Component {...props} /> : <Redirect to="/login" />
            }}
        />)

        const ProtectHome = ({component:Component,...rest})=> (<Route
            {...rest}
            render={(props)=>{
                return getUsername() ? <Redirect to="/" /> : <Component {...props} />
            }}
        />)

        return(
            <Router>
                <div>                                                               
                    <ProtectLogin exact path="/"  component={Home} />
                    <ProtectHome path="/login" component={Login} />
                </div>
            </Router>
        )
    }
}


export default App;