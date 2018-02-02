import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';

ReactDOM.render((
    <BrowserRouter>
        <Route path='/' component={Login}/>
    </BrowserRouter>
    ), document.getElementById('app'));