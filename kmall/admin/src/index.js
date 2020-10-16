import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App.js'

// ReactDOM.render(<div className="foo" />,document.getElementById('root'));//JSX语法可以写HTML标签，下面是组件的写法
ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'));