import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// Import routing components
import {Router, Route, browserHistory} from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
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
import FormCity from './FormCity.js';
import Choice from './Choice.js';
import Activities from './Activities.js';
import Timetable from './Timetable.js';

ReactDom.render(
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/Activities" component={Activities}/>
        <Route path="/FormCity" component={FormCity}/>
        <Route path="/Choice" component={Choice}/>
		<Route path="/register" component={Register}/>
        <Route path="/form" component={App}/>
        <Route path="/map" component={Map}/>
		<Route path="/logout" component={Logout}/>
		<Route path="/test" component={Test}/>
		<Route path="/welcome" component={Welcome}/>
        <Route path="/timetable" component={Timetable}/>
    </Router>,
    document.querySelector('#root')
);