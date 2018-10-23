import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// Import routing components
import {Router, Route, browserHistory} from 'react-router';
// Import custom components
import './index.css';
import App from './App.js';
import Login from './Login.js';
import Register from './Register.js';
import Logout from './Logout.js';
import Welcome from './Welcome.js';
import Map from './Map.js';
import Timeline from './Timeline.js';
import Test from './Test.js'

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
		<Route path="/register" component={Register}/>
        <Route path="/form" component={App}/>
        <Route path="/map" component={Map}/>
		<Route path="/logout" component={Logout}/>
		<Route path="/test" component={Test}/>
		<Route path="/welcome" component={Welcome}/>
    </Router>,
    document.querySelector('#root')
);