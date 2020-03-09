import React,{ Component } from 'react';
import './app.css';
import Login from './pages/login/index.js';

class App extends Component{

    render(){
        return(
                <div className='App'>
                    <Login />
                </div>
        )
    }

}

export default App;