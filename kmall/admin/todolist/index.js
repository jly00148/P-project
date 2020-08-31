import React,{ Component } from 'react';
import {Button,Col,Row,Input,List} from 'antd';
import {connect} from 'react-redux';
import './index.css';
import store from '../../src/store/index.js'; // componentDidMount需要dispatch
import { getAddItemAction,getChangeItemAction,getDelItemAction,getInitReduxThunk } from './store/actionCreate.js';


class Todolist extends Component{
    render(){
        return(

             <div className="Todolist">
                <Row>
                    <Col span={12}>
                        <Input
                            value={this.props.val}
                            onChange = {this.props.handChange}
                        />
                    </Col>
                    <Col span={12}>
                        <Button type="primary" onClick={this.props.handAdd}>新增</Button>
                    </Col>
                </Row>
            
                <List
                    style = {{marginTop:10}}
                    bordered
                    dataSource = {this.props.list}
                    renderItem = {(item)=>(<List.Item onClick={this.props.handDel}>{item}</List.Item>)}
                />
            </div>
        )

    }

    componentDidMount(){
        const action = getInitReduxThunk();
        store.dispatch(action);
    }
}

const mapStateTopProps = (state)=>{
    // console.log('::::',state); {list: Array(1), val: "谁是卧底"}
    return {
        list:state.list,
        val:state.val
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        handChange:(ev)=>{
            const val = ev.target.value;
            const action = getChangeItemAction(val);
            dispatch(action);
        },

        handAdd:()=>{
            const action = getAddItemAction()
            dispatch(action);
        },

        handDel:(index)=>{
            const action = getDelItemAction(index);
            dispatch(action);
        }
    }
}

module.exports = connect(mapStateTopProps,mapDispatchToProps)(Todolist);