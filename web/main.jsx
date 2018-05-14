import React from 'react';
import ReactDOM from 'react-dom';
import 'element-theme-default';
import axios from 'axios';
import { HashRouter, Route, History } from 'react-router-dom';
import Routes from './router';
const ui = require('element-react');

React.axios = axios;
window.ui = ui
React.axios.interceptors.request.use(function (config) {
    config.headers.authorization = window.sessionStorage.token || ''
    return config;
  }, function (error) {
    ui.Message.error('sth error')
    return Promise.reject(error);
  });

React.axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
      if(error.toString().indexOf('403') > -1) {
        ui.Message.error('token验证错误，请刷新页面，重新登录~~~')
      }
      else {
        ui.Message.error('服务器出错，请稍后再试~~~')
      }
    return Promise.reject(error);
  })

ReactDOM.render((
    <HashRouter>
        {Routes}
    </HashRouter>
), document.getElementById('app'));
