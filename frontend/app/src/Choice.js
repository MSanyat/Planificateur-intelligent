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
			button1: 'City Trip',
            button2: 'Road Trip'
	    };
	}

	switch1 = () => {
	let formData = new FormData();
    fetch('http://10.2.68.50:5000/auth/form3', {
        method: 'POST',
        body: formData
    }).then(browserHistory.push('/FormCity'));
  	}
  switch2 = () => {
	let formData = new FormData();
    fetch('http://10.2.68.50:5000/auth/form3', {
        method: 'POST',
        body: formData
    }).then(browserHistory.push('/form'));
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
                <h2> Veuillez choisir le type de vacances : </h2>
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
