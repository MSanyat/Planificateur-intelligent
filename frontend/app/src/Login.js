import React, { Component } from 'react';
import './Login.css';
import { withRouter } from 'react-router';
import { Redirect, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import axios from 'axios';
import App from './App';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.sendFormInformation = this.sendFormInformation.bind(this);
		this.changeEmail=this.changeEmail.bind(this);
		this.changePassword=this.changePassword.bind(this);
		this.state = {
		email: '',
		mdp: '',
		}
	}
  
    changeEmail(e) {
  console.log("CHANGE");
  this.setState({ email: e.target.value });
}
  changePassword(e) {
  console.log("CHANGE");
  this.setState({ mdp: e.target.value });
}

  onChange = event => {
    event.preventDefault();
	console.log('CHANGE')
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  clearForm = () => {
    this.setState({
      email: '',
      mdp: '',
    });
  }

  sendFormInformation = (email, mdp,event) => {
	let formData = new FormData();
	formData.append('email', email);
	formData.append('mdp',mdp);
    fetch('http://10.2.68.50:5000/auth/login', {
        method: 'POST',
        body: formData
    }).then(browserHistory.push('/Choice'));
  }



  render () {
    const { email, mdp } = this.state;
    return (
	<div>
		<video autoPlay muted loop id="myVideo">
		  <source src={video} type="video/mp4" />
		</video>
		<div id="parent"> 
			<div className="login_container">
				<form id="Form" role="form" >
					<div className="form-group">
						<h1> Connexion </h1>
						<div className="row">
							<div className="col-md-8">
								<input type="email" value={this.state.email} onChange={this.changeEmail} className="form-control" id="email" name="email" placeholder="email" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="password" value={this.state.mdp} onChange={this.changePassword} className="form-control" id="mdp" name="mdp" placeholder="password" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<div className="col-sm-offset-2 col-sm-10">
									<div className="auth-button">
										<button 
											type="button" onClick={() => this.sendFormInformation(email,mdp)}
											className="auth-button-go"
											id="submit"
											>Soumettre
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

    )
  }
}


export default withRouter(Login);
