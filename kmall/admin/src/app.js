import React,{ Component } from 'react';
import { BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import './app.css';
import Login from './pages/login/index.js';
import Home from './pages/Home/index.js';

class App extends Component{

    render(){
        return(
            <Router>
                <div className='App'>
                <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />
                </div>
             </Router>
        )
    }

}

export default App;