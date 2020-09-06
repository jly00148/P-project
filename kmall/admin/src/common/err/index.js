import React,{ Component } from 'react';
import { Alert } from 'antd';
import './index.css';
import { Link } from 'react-router-dom';


class Err extends Component{
    render(){
        return(
            <div className="Err">
                <Alert 
                    message="页面不存在"
                    description="您访问的页面走丢了，请确认页面地址后再试试"
                    type="error"
                    showIcon
                />
                <Link to="/">立即返回到首页</Link>
            </div>
        )
    }
}

export default Err;