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
import {FormCity} from "./FormCity";
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
*/


var json = [
	{
		id : 218142,
		name : "Salon de massage à paris Akina Zen",
		adress : "35 Rue de Clichy, Paris, France",
		category : "attraction",
		location : "Paris",
		lat : "48.879282",
		lng : "2.329398",
		polarity : 7
	},
	{
		id : 218143,
		name : "Musée national Gustave Morau",
		adress : "14 Rue de la Rochefoucauld, Paris, France",
		category : "attraction",
		location : "Paris",
		lat : "48.877962",
		lng : "2.334488",
		polarity : 6
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




class Activities extends React.Component {

	constructor(props) {
		super(props);

		//this.values = this.props.location.state.nom.bind(this);
		this.state = {
			//dest: this.props.location.state.some
				values: this.props.location.state.nom,
				button: 'Valider'
		};
	}
	temp = () => {
				var data = []
				for(var i = 0; i <this.state.values.length; i++){
					data.push(this.state.values[i])
				}
				return data
	}

	submit = () => {
		let formData = new FormData();
		fetch('http://10.2.68.50:5000/auth/form3', {
			method: 'POST',
			body: formData
		}).then(browserHistory.push('/timetable'));
	}

  render () {
	
    return (
		
	<div className="cover-full">
				<section style={ sectionStyle } id="myPhoto">
				</section>
        <div className="login_container">
                <h2> Veuillez choisir les activités vous correspondant: {this.temp()} </h2>
					<JSONPretty id="json-pretty" json={json[0].name}></JSONPretty>
					<button class="btn btn-success"><TiTick /></button>
					<button class="btn btn-danger"><TiTimes /></button>
					<JSONPretty id="json-pretty" json={json[1].name}></JSONPretty>
					<button class="btn btn-success"><TiTick /></button>
					<button class="btn btn-danger"><TiTimes /></button>
				<form id="Activities" role="form" onSubmit={() => this.submit()}>
                     <center><button class="btn btn-default" type="submit">{this.state.button}
                     </button></center>
				</form>
        </div>
	</div>
	)
  }
}
export default withRouter(Activities);
