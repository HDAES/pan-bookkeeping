/*
 * @Descripttion: 
 * @Author: Hades
 * @Date: 2020-05-18 10:17:48
 * @LastEditTime: 2020-08-02 21:51:53
 */ 
import React from 'react';
import ReactDOM from 'react-dom';
import  { Provider } from 'react-redux'
import Router  from './Router'
import './style/main.less'
import config from './redux/store'
// import  'antd/dist/antd.less';
const store = config()
ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, 
  document.getElementById('root')
);
