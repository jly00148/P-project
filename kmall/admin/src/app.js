import React, { Component } from 'react';
import Todolist from 'pages/Todolist'; //配制别名后，pages代表单前文件下./pages文件,在其他任何地方直接可以用,下同
import Login from 'pages/Todolist';
import { BrowserRouter as Router,Route, Link, Switch } from 'react-router-dom';//h5路由会向后台发送请求,配制文件添加historyApiFallback:true
// import { HashRouter as Router,Route, Link } from 'react-router-dom';//hash路由并不会向后台发送请求

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin:false
        }
    }
    render(){
        return(
            <Router>
                <div>
                    <Route path="/" exact component={Todolist}/>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        )
    }
}


export default App;