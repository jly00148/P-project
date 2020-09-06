import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import  { actions } from './store/index.js';



  
class Home extends Component{
    constructor(props){
        super(props);
    }
  
    render(){
        return (
            <div className="Home">
                <h1>home page</h1>
            </div>
        )};
  };

const mapStateToProps = (state)=>{
    return {

    }
}

const mapDispatchToProps = (dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);