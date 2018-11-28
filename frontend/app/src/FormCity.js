import React, { Component } from 'react';
import { Select, Trigger, OptionList, Option, utils, getToggledOptions } from 'react';
//import utils, { getToggledOptions } from 'react';
import './FormCity.css';
import { withRouter } from 'react-router';
import { Redirect, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import Background from './static/img/paris.jpg';
import Background2 from './static/img/Paris2.jpg';
import axios from 'axios';
import App from './App';


var sectionStyle = {
	width: "100%",
	height: "100%",
	backgroundImage: `url(${Background})`,
	backgroundSize: `cover`
}



class CheckboxOption extends Component {
  render() {
    const { value, isChecked, children } = this.props
    return (
      <Option className="react-select-option" value={value}>
        <input
          type="checkbox"
          className="react-select-option__checkbox"
          defaultValue={null}
          checked={isChecked}
        />
        <div className="react-select-option__label">
          {children}
        </div>
      </Option>
    )
  }
}

 export class FormCity extends React.Component {
	constructor(props) {
		super(props);
		this.sendFormInformation = this.sendFormInformation.bind(this);
		this.changeDest = this.changeDest.bind(this);
		this.changeBudget = this.changeBudget.bind(this);
		this.changeTime = this.changeTime.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onChange2 = this.onChange2.bind(this);
		this.changeKoa = this.changeKoa.bind(this);
		this.state = {
			dest: '',
			budget: '',
			time:'',
			value: 'select',//kind of travel
			value2: 'select',//number of activities
			koa:'' //kind of activities
		};
	}

	onChange(e) {
		this.setState({value: e.target.value})
	}

	onChange2(e) {
		this.setState({value2: e.target.value})
	}

	changeDest(e) {
      console.log("CHANGE");
      this.setState({ dest: e.target.value });
    }
    changeBudget(e) {
      console.log("CHANGE");
      this.setState({ budget: e.target.value });
    }
    changeTime(e) {
      console.log("CHANGE");
      this.setState({ time: e.target.value });
    }
    changeKoa(e) {
      console.log("CHANGE");
      this.setState({ koa: e.target.value });
    }

	sendFormInformation = (dest, budget, time, koa, value, value2) => {
	let formData = new FormData();
	formData.append('dest', dest);
	formData.append('budget',budget);
	formData.append('time', time);
	formData.append('koa',koa);
	formData.append('value', value);
	formData.append('value2',value2);
	var url = 'http://10.2.68.50:5000/auth/form2?';
	var depart = 'dest='.concat(this.state.dest,'&');
	var result = depart.concat('budget=',this.state.budget,'&',
							'time=', this.state.time,'&',
							'koa=', this.state.koa,'&',
							'value=', this.state.value,'&',
							'value2=', this.state.value2,'&');
	alert(result);

	var request = new Request(url.concat(result), {method:'GET', mode:'no-cors', headers : new Headers(formData)});

    fetch('http://10.2.68.50:5000/auth/form2?', {
        method: 'GET',
        headers : new Headers(formData)
    })
		.then(response => response.json())
		.then(browserHistory.push('/Activities'));
		/*({
		  pathname: '/Activities',
		  search: '?the=search',
		  state: { some: 'dest' }
		})*/
  	}

  render () {

    const {dest, budget, time, koa, value, value2} = this.state;

    return (
    		<div className="cover-full">
				<section style={ sectionStyle } id="myPhoto">
				</section>
				<div className="register_container">
					<form id="checkout" role="form" onSubmit={() => this.sendFormInformation(dest, budget, time, koa, value, value2)}>
						<div className="form-group">
							<h2> Veuillez indiquer les informations ci-dessous : </h2>
							<div className="row">
								<div className="col-sm-8">
									<input type="text"  value={this.state.dest} onChange={this.changeDest}  className="form-control" name="dest" placeholder="Destination" required />
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<input type="text" value={this.state.budget} onChange={this.changeBudget} className="form-control" name="budget" placeholder="Budget" required />
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<input type="text" value={this.state.time} onChange={this.changeTime} className="form-control" name="time" placeholder="Durée (en jours)" required />
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<label htmlFor="select1" >Type de voyage</label>
									<select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
									  <option value="Select">Choisir</option>
									  <option value="First">Seul</option>
									  <option value="Second">Couple</option>
									  <option value="Third">Entre amis</option>
										<option value="Fourth">Entre collègues</option>
										<option value="Fifth">En famille</option>
									</select>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<label htmlFor="select1" >Nombre d'activité par jour</label>
									<select value={this.state.value2} onChange={this.onChange2.bind(this)} className="form-control">
										<option value="0">0</option>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4+</option>
									</select>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<input type="text" value={this.state.koa} onChange={this.changeKoa} className="form-control" name="koa" placeholder="Genres d'activité" required />
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<div className="col-sm-offset-2 col-sm-10">
										<div className="auth-button">
											<button
												type="submit"
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
    )
  }
}

export default withRouter(FormCity);