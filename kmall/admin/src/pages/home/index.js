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
                <Layout  
                    usernum={this.props.usernum}
                    ordernum={this.props.ordernum}
                    productnum={this.props.productnum}
                />

            </div>
        )};
  };

const mapStateToProps = (state)=>{
    return {
        usernum:state.get('home').get('usernum'),
        ordernum:state.get('home').get('ordernum'),
        productnum:state.get('home').get('productnum')
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);