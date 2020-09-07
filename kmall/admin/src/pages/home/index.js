import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../common/layout/index.js';
import './index.css';
  
class Home extends Component{
    constructor(props){
        super(props);
    }
  
    render(){
        return (
            <div className="Home">
                <Layout>
                    <h1>首页</h1>
                </Layout>
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