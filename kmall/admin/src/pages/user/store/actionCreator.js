import { message } from 'antd'
// import  axios from 'axios';
import * as types  from './actionTypes.js'
import api from 'api';
const getSetCountAction = (payload)=>({
    type:types.SET_COUNT,
    payload
})

