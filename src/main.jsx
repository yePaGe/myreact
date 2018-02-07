import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/login/Login';

window.axios = axios;

ReactDOM.render((
    <BrowserRouter>
        <Route path='/' component={Login}/>
    </BrowserRouter>
    ), document.getElementById('app'));