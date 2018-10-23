import React, { Component } from 'react';
import './Login.css';
import { withRouter } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';

class Logout extends React.Component {
	constructor(props) {
		super(props);
		this.sendFormInformation = this.sendFormInformation.bind(this);
	}


  onChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  }


  sendFormInformation = (email, password) => {
    const { router } = this.props;

    return fetch('http://10.2.68.50:5000/auth/logout', {
        method: 'GET',
		mode: 'no-cors',
      
    }).then(res => {
      if (res.status >= 400) {
        return res.json().then(err => {
          throw err;
        });
		console.log(0)
      }
      return res.json();
    }).then(data => {
      console.log(1)
      localStorage.setItem('token', data.result.auth_token)
      if (!!localStorage.token) {
        router.push('./Form')
      }
    })
  }

  render () {
    return (
	<div>
		<video autoPlay muted loop id="myVideo">
		  <source src={video} type="video/mp4" />
		</video>
		<div id="parent"> 
			<div className="login_container">
				<form id="Form" role="form" onSubmit={ (event) => this.sendFormInformation() }>
					<div className="form-group">
						<div className="row">
							<div className="col-sm-8">
								<div className="col-sm-offset-2 col-sm-10">
									<div className="auth-button">
										<button 
											type="submit"
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


export default withRouter(Logout);