import React, { Component } from 'react';
import './Login.css';
import { withRouter } from 'react-router';
import { Redirect, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import axios from 'axios';
import App from './App';

class Choice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			button1: 'Register',
            button2: 'Login'
	    };
	}

	switch1 = () => {
	let formData = new FormData();
    browserHistory.push('/register');
  	}
  switch2 = () => {
	browserHistory.push('/login');
  }


  render () {
    const { variant, content, others } = this.state;
    return (
	<div>
		<video autoPlay muted loop id="myVideo">
		  <source src={video} type="video/mp4" />
		</video>
		<div id="parent">

			<div className="login_container">
                <h2> Bienvenue! </h2>
                <div className="col-lg-1 col-centered" style={{ width: '100%', textAlign: 'initial' }}>
					<form id="Form" role="form" onSubmit={() => this.switch1()}>
                     <button class="btn btn-primary" type="submit">{this.state.button1}
                     </button>
					</form>
					<form id="Form2" role="form" onSubmit={() => this.switch2()}>
                     <button class="btn btn-primary" type="submit">{this.state.button2}
                     </button>
					</form>

                </div>
			</div>
		</div>
	</div>

    )
  }
}


export default withRouter(Choice);
