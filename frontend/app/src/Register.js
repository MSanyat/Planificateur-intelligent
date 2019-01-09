import React, { Component } from 'react';
import './Register.css';
import { withRouter } from 'react-router';
import { Redirect, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import axios from 'axios';
import $ from 'jquery';


class Register extends React.Component {
	constructor(props) {
		super(props);
		this.sendFormInformation = this.sendFormInformation.bind(this);
		this.changeEmail = this.changeEmail.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeFirstName = this.changeFirstName.bind(this);
		this.changeAddress = this.changeAddress.bind(this);
		this.changeCity = this.changeCity.bind(this);
		this.changeCP = this.changeCP.bind(this);
		this.changeTags = this.changeTags.bind(this);
		this.state = {
    email: '',
    mdp: '',
	nom:'',
	prenom:'',
	ville:'',
	rue:'',
	cp:'',
	tags:'',
	status:''
  }
	}
  

  /**onChange = event => {
    console.log(event.target.name);
	event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  }**/
  changeEmail(e) {
  console.log("CHANGE");
  this.setState({ email: e.target.value });
}
changePassword(e) {
  console.log("CHANGE");
  this.setState({ mdp: e.target.value });
}
changeName(e) {
  console.log("CHANGE");
  this.setState({ nom: e.target.value });
}
changeFirstName(e) {
  console.log("CHANGE");
  this.setState({ prenom: e.target.value });
}
changeAddress(e) {
  console.log("CHANGE");
  this.setState({ rue: e.target.value });
}
changeCity(e) {
  console.log("CHANGE");
  this.setState({ ville: e.target.value });
}
changeCP(e) {
  console.log("CHANGE");
  this.setState({ cp: e.target.value });
}
changeTags(e) {
  console.log("CHANGE");
  this.setState({ tags: e.target.value });
}
  clearForm = () => {
    this.setState({
		email: '',
		mdp: '',
		nom:'',
		prenom:'',
		ville:'',
		rue:'',
		cp:'',
		tags:''
    });
  }

  sendFormInformation = (email, mdp, nom, prenom, ville, cp, rue, tags) => {
	let formData = new FormData();
	console.log(this.state.email)
	formData.append('email', email);
	formData.append('mdp',mdp);
	formData.append('nom',nom);
	formData.append('prenom',prenom);
	formData.append('ville',ville);
	formData.append('cp',cp);
	formData.append('rue',rue);
	formData.append('tags',tags);
	console.log(formData)
    fetch('http://10.4.95.236:5000/auth/register', {
        method: 'POST',
        body: formData,
		mode: 'no-cors'
    }).then(browserHistory.push('/'));
  }


  render () {
    const { email, mdp, nom, prenom, ville, cp, rue, tags} = this.state;
    return (
	<div>
		<video autoPlay muted loop id="myVideo">
		  <source src={video} type="video/mp4" />
		</video>
		<div id="parent"> 
			<div className="register_container">
				<form id="Form" role="form" >
					<div className="form-group">
						<h1> Connexion </h1>
						<div className="row">
							<div className="col-sm-8">
								<input type="text"  value={this.state.email} onChange={this.changeEmail}  className="form-control" name="email" placeholder="email" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="password" className="form-control" value={this.state.mdp} onChange={this.changePassword} name="mdp" placeholder="password" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="text" value={this.state.nom} onChange={this.changeName} className="form-control" name="nom" placeholder="Chirac" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="text" value={this.state.prenom} onChange={this.changeFirstName} className="form-control" name="prenom" placeholder="Jacques" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="text" value={this.state.rue} onChange={this.changeAddress} className="form-control" name="rue" placeholder="86, blvd Hausmann" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="text" value={this.state.ville} onChange={this.changeCity} className="form-control" name="ville" placeholder="Paris" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="text" value={this.state.cp} onChange={this.changeCP} className="form-control" name="cp" placeholder="75008" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<input type="text" value={this.state.tags} onChange={this.changeTags} className="form-control" name="tags" placeholder="Art" required />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<div className="col-sm-offset-2 col-sm-10">
									<div className="auth-button">
										<button 
											type="button" onClick={() => this.sendFormInformation(email,mdp,nom, prenom,ville,cp,rue,tags)}
											name="auth-button-go"
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


export default withRouter(Register);
