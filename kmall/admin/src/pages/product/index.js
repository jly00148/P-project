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
          <Route exact path="/product/" component={productList} />
          <Route path="/product/add" component={productSave} />
        </Switch>
      )
    }
}

export default Product;