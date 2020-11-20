import React, { Component } from 'react'
import './index.css';
import { 
  Route, 
  Switch,
} from "react-router-dom";

import productSave from './save.js';
import productList from './list.js';

class Product extends Component {
  constructor(props){
    super(...props)
  }
    render(){
      return (
        <Switch>
          <Route exact path="/product/" component={productList} />{/* exac精确匹配 */}
          <Route path="/product/save/:productId?" component={productSave} />{/* 
          路由可以写正则的，包括?到：是可有可无的，
          正因为如此才能匹配到带参数和不带参数的路由 ,
          之后考虑到点击修改页面获取参数的问题*/}
        </Switch>
      )
    }
}

export default Product;