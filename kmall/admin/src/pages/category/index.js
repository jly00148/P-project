import React, { Component } from 'react'
import './index.css';
import { 
  Route, 
  Switch,
} from "react-router-dom";

import CategoryAdd from './add.js';
import CategoryList from './list.js';


class Category extends Component {
  constructor(props){
    super(...props)
  }
    render(){
      return (
        <Switch>
          <Route exact path="/category/" component={CategoryList} />
          <Route path="/category/add" component={CategoryAdd} />
        </Switch>
      )
    }
}

export default Category;