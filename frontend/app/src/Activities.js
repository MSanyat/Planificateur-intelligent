import React, { Component } from 'react';
import './Login.css';
import { withRouter } from 'react-router';
import { Redirect, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import axios from 'axios';
import App from './App';
import Background from "./static/img/paris.jpg";
import Background2 from "./static/img/Versaille.jpg";
import { FormCity } from "./FormCity";
//import ReactJson from 'react-json-view';
import JSONPretty from 'react-json-pretty';
import { TiTick, TiTimes } from 'react-icons/ti';
//import ReactFileReader from 'react-file-reader';
//import { CsvToHtmlTable } from 'react-csv-to-table';

//var files = EXCEL.target.files;
//var Excel = require('exceljs').readFile(EXCEL);
//console.log(files[0]);
/*var workbook = new Excel.Workbook();

workbook.creator = 'Me';
workbook.created = new Date(2018, 11, 25);

workbook.xlsx.readFile(EXCEL)
    .then(function() {
		// use workbook
	});
	
	   <ReactJson src={id1}/>
				<ReactJson src={id2}/>
				<JSONPretty id="json-pretty" json={id1}></JSONPretty>


				<JSONPretty id="json-pretty" json={json[0].name}></JSONPretty>
*/


var json = [
	{
		id: 218142,
		name: "Salon de massage à paris Akina Zen",
		adress: "35 Rue de Clichy, Paris, France",
		category: "attraction",
		location: "Paris",
		lat: "48.879282",
		lng: "2.329398",
		polarity: 7
	},
	{
		id: 218143,
		name: "Musée national Gustave Morau",
		adress: "14 Rue de la Rochefoucauld, Paris, France",
		category: "attraction",
		location: "Paris",
		lat: "48.877962",
		lng: "2.334488",
		polarity: 6
	}
]

//var jsonStr = JSON.stringify(json);
//var obj = JSON.parse(json);
//alert(json.id1 + json.id2);
var sectionStyle = {
	width: "100%",
	height: "100%",
	backgroundImage: `url(${Background})`,
	backgroundSize: `cover`
}
var sectionS = {
	width: "100%",
	height: "100%",
	backgroundImage: `url(${Background2})`
}
var select = {

}



class Activities extends React.Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.submit = this.submit.bind(this);
		this.temp = this.temp.bind(this);
		//this.values = this.props.location.state.nom.bind(this);
		//<button class="btn btn-success"><TiTick /></button>
		//<button class="btn btn-danger"><TiTimes /></button>
		//for(let i = 0; i < data.length; i++) {
		this.state = {
			//dest: this.props.location.state.some
			values: this.props.location.state.nom,
			ids : this.props.location.state.ids,
			button: 'Valider',
			data_ok:[],
			data_ko:[],
			j_dep: this.props.location.state.j_dep,
			j_arr: this.props.location.state.j_arr,
			nbActivities: this.props.location.state.nbActivities,
			schedule:[],
			full_schedule:[]
		};
	}

	handleClick = (event) => {
		event.preventDefault();
		const id = event.currentTarget.id;
		if (id.substr(-2)== 'ok'){
			if (this.state.data_ok.includes(id.substring(0,5))== false) {

				this.state.data_ok.push(id.substring(0,5));
			}

			if (this.state.data_ko.includes(id.substring(0,5))== true) {

				this.state.data_ko.splice(id.substring(0,5).index,1);

			}
		}
		if (id.substr(-2)== 'ko'){
			if (this.state.data_ko.includes(id.substring(0,5))== false) {

				this.state.data_ko.push(id.substring(0,5));
			}

			if (this.state.data_ok.includes(id.substring(0,5))== true) {

				this.state.data_ok.splice(id.substring(0,5).index,1);

			}
		}
		console.log(id);
		console.log('ok : ',this.state.data_ok);
		console.log('ko : ',this.state.data_ko);
		//console.log('test');
	}

	temp = () => {
		var data = []
		var idList = []
		var dataList = []
		for (var i = 0; i < this.state.values.length; i++) {
			data.push(this.state.values[i])
			idList.push(this.state.ids[i])
		}
		console.log('idList = ',idList);
		dataList = data.map(function (data,index) {
			const idList = this.state.ids;
			return <li>{data}	<div>
				<button type="button"  id={idList[index]+'_ok'} value={data} class="btn btn-success" onClick={this.handleClick}><TiTick /></button>
				<button type="button"  id={idList[index]+'_ko'} class="btn btn-danger" onClick={this.handleClick}><TiTimes /></button></div>
			</li>
		}.bind(this))
		return (
			<ul> {dataList}
			</ul>

		);
	}

	submit = (data_ok, data_ko) => {
		console.log('in submit');
		console.log(data_ok);
		console.log(this.state.data_ok);
		//let formData = new FormData();
		//formData.append('data_ok', data_ok);
		//formData.append('data_ko', data_ko);
		//console.log(formData);
		var url = 'http://10.4.95.236:5000/auth/Activities?';
		var depart = 'data_ok='.concat(this.state.data_ok,'&');
		var result = depart.concat('data_ko=',this.state.data_ko,'&j_dep=',this.state.j_dep,'&j_arr=',this.state.j_arr,'&nbActivities=',this.state.nbActivities);
		var request = new Request(url.concat(result), {method:'GET', headers : ({
			'Accept': 'application/json',
			//'Content-Type': 'application/json'
			'Content-Type':'application/x-www-form-urlencoded'
	   })
	   /*,body: JSON.stringify({
		data_ok: this.state.data_ok,
		data_ko: this.state.data_ko
	  }) */
	});
	   fetch(request)
	   .then((response) =>{
		 console.log(response);
		var json=response.json();
			//console.log(json.schedule);
			
			//this.state.schedule=json.schedule;
			//console.log("Resultat = ",this.state.schedule);
			return json;})
		
		.then(( schedule ) => {
			this.state.schedule = schedule.schedule;
			console.log(this.state.schedule);
		/*	for (var i = 0, emp; i <this.state.resultat.steps.length; i++) { 
				emp = this.state.resultat.steps[i]; 
				this.state.data.push(emp.nom);
				this.state.ids.push(emp.id);
			}
			console.log('Nom = ',this.state.data);
			var data = this.state.data;
			var ids = this.state.ids;
			var j_dep = this.state.j_dep;
			var j_arr = this.state.j_arr;
			var nbActivities = this.state.value2; */
			var schedule = this.state.schedule;
			browserHistory.push({pathname:'/Timetable',state:{ schedule: this.state.schedule}})
			
		})
	//	.then();
	}
/*
	submit = (data_ok, data_ko) => {
		console.log('in submit');
		let formData = new FormData();		
		fetch('http://10.2.68.50:5000/auth/Activities?', {
			
			method: "post",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
		  
			//make sure to serialize your JSON body
			body: JSON.stringify({
			  data_ok: this.state.data_ok,
			  data_ko: this.state.data_ko
			})
		}).then(browserHistory.push('/timetable'));
	}
*/
//onSubmit={() => this.submit()}
	myFunction = () => {
		console.log()
	}

	render() {
		const {data_ko, data_ok} = this.state;
		return (
			<div className="cover-full">
				<section style={sectionStyle} id="myPhoto">
				</section>
				<form id="checkout" role="form">
				
				<div className="login_container">
					<h2> Veuillez choisir les activités vous correspondant:</h2>
					<h4>{this.temp()}</h4>
					<div id="testDoc"></div>
				
						<center><button class="btn btn-default" type="button" onClick={() => this.submit(data_ok, data_ko)}>{this.state.button}
						</button></center>
				
				</div>
				
				</form>
			</div>
		)
	}
}
export default withRouter(Activities);
