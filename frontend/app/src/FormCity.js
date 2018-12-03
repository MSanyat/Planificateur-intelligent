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
		this.onChange = this.onChange.bind(this);
		this.onChange2 = this.onChange2.bind(this);
		this.changeKoa = this.changeKoa.bind(this);
		this.changeJ_dep = this.changeJ_dep.bind(this);
		this.changeJ_arr = this.changeJ_arr.bind(this);
		this.state = {
			dest: '',
			budget: '',
			value: 'select',//kind of travel
			value2: 'select',//number of activities
			koa:'', //kind of activities
			j_dep:'',
			j_arr:'',
			resultat:[],
			data:[],
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
    changeKoa(e) {
      console.log("CHANGE");
      this.setState({ koa: e.target.value });
		}
		changeJ_dep(e) {
      console.log("CHANGE");
      this.setState({ j_dep: e.target.value });
		}
		changeJ_arr(e) {
      console.log("CHANGE");
      this.setState({ j_arr: e.target.value });
    }

	sendFormInformation = (dest, budget, time, koa, value, value2, j_dep, j_arr) => {
	let formData = new FormData();
	formData.append('dest', dest);
	formData.append('budget',budget);
	formData.append('koa',koa);
	formData.append('value', value);
	formData.append('value2',value2);
	formData.append('j_dep',j_dep);
	formData.append('value2',j_arr);
	var url = 'http://10.4.95.88:5000/auth/FormCity?';
	var depart = 'dest='.concat(this.state.dest,'&');
	var result = depart.concat('budget=',this.state.budget,'&',
							'koa=', this.state.koa,'&',
							'value=', this.state.value,'&',
							'j_dep=', this.state.j_dep,'&',
							'j_arr=', this.state.j_arr,'&',
							'value2=', this.state.value2,'&');
	alert(result);

	var request = new Request(url.concat(result), {method:'GET', headers : new Headers({
     'Authorization': 'Basic '+btoa('username:password'), 
     'Content-Type': 'application/x-www-form-urlencoded'
   },formData)});
	
//	fetch('http://192.168.127.1:5000/auth/form?add_dep=Metz&add_arr=Bordeaux&escales=Paris&tags=Art&max_escales=3&optimisation=affinity&mode=driving&h_dep=08:00&h_arr=21:00&j_dep=01122018&j_arr=01122018&t_max=7200&d_max=300000', {method:'GET', mode:'no-cors', headers : new Headers(formData)})
	fetch(request)
	.then((response) =>{
	console.log("test");
     console.log(response);
	var json=response.json();
		console.log(json);
		return json;
		this.state.resultat=json.steps;
		console.log("Resultat = ",this.state.resultat);})
		
//    return response.json();});
	.then(( steps ) => {this.state.resultat = steps;
		
		for (var i = 0, emp; i <this.state.resultat.steps.length; i++) { 
			emp = this.state.resultat.steps[i]; 
			this.state.data.push(emp.nom)
		}
		console.log('Nom = ',this.state.data);
		var data = this.state.data;
		browserHistory.push({pathname:'/Activities',state:{ nom: data }}); 
	});	


	//.then(browserHistory.push('/Activities'));
		/*({
		  pathname: '/Activities',
		  search: '?the=search',
		  state: { some: 'dest' }
		})*/
  	}

  render () {

    const {dest, budget, time, koa, value, value2, j_dep, j_arr} = this.state;

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
							<label className="col-sm-2" htmlFor="j_dep">Départ</label>
							<div className="col-sm-8">
								<input type="date" value={this.state.j_dep} name="j_dep" required={true} onChange={this.changeJ_dep} />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="row">
							<label className="col-sm-2" htmlFor="j_dep">Arrivée</label>
							<div className="col-sm-8">
								<input type="date" value={this.state.j_arr} name="j_arr" required={true} onChange={this.changeJ_arr} />
							</div>
						</div>
					</div>
						<div className="form-group">
							<div className="row">
								<div className="col-sm-8">
									<label htmlFor="select1" >Type de voyage</label>
									<select value={this.state.value} onChange={this.onChange.bind(this)} className="form-control">
									  <option value="Select">Choisir</option>
									  <option value="Solo">Seul</option>
									  <option value="Couple">Couple</option>
									  <option value="Entre amis">Entre amis</option>
										<option value="Entre collÃ¨gues">Entre collègues</option>
										<option value="Famille">En famille</option>
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