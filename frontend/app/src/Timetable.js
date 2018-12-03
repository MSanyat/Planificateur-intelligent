import React, { Component } from 'react';
import './Login.css';
import { withRouter } from 'react-router';
import { Redirect, browserHistory } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import axios from 'axios';
import App from './App';
import Background from "./static/img/Fond2.png";
import Background2 from "./static/img/Versaille.jpg";
import {FormCity} from "./FormCity";
import './Timetable.css';
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';

/*var items = [
	{
		id : 218142,
		name : "Salon de massage à paris Akina Zen",
		adress : "35 Rue de Clichy, Paris, France",
		category : "attraction",
		location : "Paris",
		lat : "48.879282",
		lng : "2.329398",
		polarity : 7,
		classes       : 'color-1'
	},
	{
		id : 218143,
		name : "Musée national Gustave Morau",
		adress : "14 Rue de la Rochefoucauld, Paris, France",
		category : "attraction",
		location : "Paris",
		lat : "48.877962",
		lng : "2.334488",
		polarity : 6,
		classes       : 'color-2 color-3'
	}
]
*/

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

var colors= {
	'color-1':"rgba(102, 195, 131 , 1)" ,
	"color-2":"rgba(242, 177, 52, 1)" ,
	"color-3":"rgba(235, 85, 59, 1)"
}
   
var now = new Date();

  var items = [
	{
	 _id            :guid(),
	  name          : 'Salon de massage à paris Akina Zen',
	  startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
	  endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
	  classes       : 'color-1'
	},
	{
	 _id            :guid(),
	  name          : 'Musée national Gustave Morau',
	  startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 1, 0),
	  endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 3, 0),
	  classes       : 'color-2'
	},
  ];


class Activities extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items:items,
			selected:[],
			cellHeight:30,
			showModal:false,
			locale:"fr",
			rowsPerHour:2,
			numberOfDays:7,
			startDate: new Date()
		};
		this.handleCellSelection = this.handleCellSelection.bind(this)
		this.handleItemEdit = this.handleItemEdit.bind(this)
		this.handleRangeSelection = this.handleRangeSelection.bind(this)
	  }
	 
	handleCellSelection(item){
	  console.log('handleCellSelection',item)
	}
	handleItemEdit(item){
	  console.log('handleItemEdit', item)
	}
	handleRangeSelection(item){
	  console.log('handleRangeSelection', item)
	}
	
  render () {
    return (
	<div className="cover-full">
				<section style={ sectionStyle } id="myPhoto">
				</section>
        <div>
		<h2> Planning de la semaine </h2>
        <ReactAgenda
          minDate={now}
          maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
          disablePrevButton={false}
          startDate={this.state.startDate}
          cellHeight={this.state.cellHeight}
          locale={this.state.locale}
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          autoScale={false}
          fixedHeader={true}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onRangeSelection={this.handleRangeSelection.bind(this)}/>
        </div>
	</div>
	)
  }
}
export default withRouter(Activities);
