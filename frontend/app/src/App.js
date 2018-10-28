

import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router';
import { Redirect, Link, browserHistory } from 'react-router'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import video from './static/img/video.mp4';
import { WithContext as ReactTags } from 'react-tag-input';
import Map from './Map';
import { createHashHistory } from 'history'
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Radio from 'muicss/lib/react/radio';

 
const KeyCodes = {
  comma: 188,
  enter: 13,
};

export const history = createHashHistory()
 
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class App extends React.Component {
	constructor(props) {
        super(props);
 
        this.state = {
            tags: [],
            suggestions: [
                { id: 'Track', text: 'Track' },{  id: 'Service', text: 'Service' },{  id: 'Boutique', text: 'Boutique' },{  id: 'Boxing', text: 'Boxing' },{  id: 'Theme', text: 'Theme' },{  id: 'Station', text: 'Station' },{  id: 'Playground', text: 'Playground' },
				{ id: 'Hobby', text: 'Hobby' },{  id: 'Fitness', text: 'Fitness' },{  id: 'Comedy', text: 'Comedy' },{  id: 'Public', text: 'Public' },{  id: 'Bookste', text: 'Bookste' },{  id: 'Bistro', text: 'Bistro' },{  id: 'Ballroom', text: 'Ballroom' },
				{ id: 'Gym', text: 'Gym' },{  id: 'Football', text: 'Football' },{  id: 'Cultural', text: 'Cultural' },{  id: 'French', text: 'French' },{  id: 'Joint', text: 'Joint' },{  id: 'Liqu', text: 'Liqu' },{  id: 'Studio', text: 'Studio' },{  id: 'Aquarium', text: 'Aquarium' },
				{ id: 'Marina', text: 'Marina' },{  id: 'Karaoke', text: 'Karaoke' },{  id: 'Pool', text: 'Pool' },{  id: 'Furniture', text: 'Furniture' },{  id: 'Building', text: 'Building' },{  id: 'Skating', text: 'Skating' },{  id: 'Agency', text: 'Agency' },
				{ id: 'Bar', text: 'Bar' },{  id: 'Restaurant', text: 'Restaurant' },{  id: 'Venue', text: 'Venue' },{  id: 'Bakery', text: 'Bakery' },{  id: 'Farmers', text: 'Farmers' },{  id: 'Nightlife', text: 'Nightlife' },{  id: 'Bowling', text: 'Bowling' },
				{ id: 'Landmark', text: 'Landmark' },{  id: 'Ferry', text: 'Ferry' },{  id: 'Athletics', text: 'Athletics' },{  id: 'Non-Profit', text: 'Non-Profit' },{  id: 'Wine', text: 'Wine' },{  id: 'Shop', text: 'Shop' },{  id: 'Dojo', text: 'Dojo' },{  id: 'Art', text: 'Art' },
				{ id: 'Indie', text: 'Indie' },{  id: 'Rest', text: 'Rest' },{  id: 'Gallery', text: 'Gallery' },{  id: 'Planetarium', text: 'Planetarium' },{  id: 'Tag', text: 'Tag' },{  id: 'Rink', text: 'Rink' },{  id: 'Go', text: 'Go' },{  id: 'Spa', text: 'Spa' },
				{ id: 'Outdo', text: 'Outdo' },{  id: 'Event', text: 'Event' },{  id: 'Arts', text: 'Arts' },{  id: 'Cowking', text: 'Cowking' },{  id: 'Jewelry', text: 'Jewelry' },{  id: 'Arcade', text: 'Arcade' },{  id: 'Entertainment', text: 'Entertainment' },
				{ id: 'Museum', text: 'Museum' },{  id: 'Zoo', text: 'Zoo' },{  id: 'Beer', text: 'Beer' },{  id: 'Alley', text: 'Alley' },{  id: 'Stationery', text: 'Stationery' },{  id: 'Diner', text: 'Diner' },{  id: 'Coffee', text: 'Coffee' },{  id: 'Run', text: 'Run' },
				{ id: 'Fountain', text: 'Fountain' },{  id: 'Park', text: 'Park' },{  id: 'Miscellaneous', text: 'Miscellaneous' },{  id: 'Pub', text: 'Pub' },{  id: 'Water', text: 'Water' },{  id: 'Fest', text: 'Fest' },{  id: 'Salsa', text: 'Salsa' },{  id: 'Perfming', text: 'Perfming' },
				{ id: 'Ride', text: 'Ride' },{  id: 'Arena', text: 'Arena' },{  id: 'Palace', text: 'Palace' },{  id: 'School', text: 'School' },{  id: 'Theater', text: 'Theater' },{  id: 'Gaming', text: 'Gaming' },{  id: 'Scenic', text: 'Scenic' },{  id: 'Tapas', text: 'Tapas' },
				{ id: 'Plaza', text: 'Plaza' },{  id: 'Racetrack', text: 'Racetrack' },{  id: 'Tour', text: 'Tour' },{  id: 'Rock', text: 'Rock' },{  id: 'Recding', text: 'Recding' },{  id: 'Gay', text: 'Gay' },{  id: 'Reservoir', text: 'Reservoir' },{  id: 'Dance', text: 'Dance' },
				{ id: 'Fish', text: 'Fish' },{  id: 'Circus', text: 'Circus' },{  id: 'Harb', text: 'Harb' },{  id: 'Amphitheater', text: 'Amphitheater' },{  id: 'Auditium', text: 'Auditium' },{  id: 'Facty', text: 'Facty' },{  id: 'Design', text: 'Design' },{  id: 'Market', text: 'Market' },
				{ id: 'Home', text: 'Home' },{  id: 'Cafe', text: 'Cafe' },{  id: 'Photography', text: 'Photography' },{  id: 'Travel', text: 'Travel' },{  id: 'Castle', text: 'Castle' },{  id: 'Lounge', text: 'Lounge' },{  id: 'Music', text: 'Music' },{  id: 'Cosmetics', text: 'Cosmetics' },
				{ id: 'Stadium', text: 'Stadium' },{  id: 'Provider', text: 'Provider' },{  id: 'Piano', text: 'Piano' },{  id: 'Meeting', text: 'Meeting' },{  id: 'Temple', text: 'Temple' },{  id: 'Lookout', text: 'Lookout' },{  id: 'Used', text: 'Used' },{  id: 'Cocktail', text: 'Cocktail' },
				{ id: 'Farm', text: 'Farm' },{  id: 'Hotel', text: 'Hotel' },{  id: 'Baseball', text: 'Baseball' },{  id: 'Botanical', text: 'Botanical' },{  id: 'Histy', text: 'Histy' },{  id: 'Ste', text: 'Ste' },{  id: 'Laser', text: 'Laser' },{  id: 'Center', text: 'Center' },
				{ id: 'Motcycle', text: 'Motcycle' },{  id: 'Mini', text: 'Mini' },{  id: 'Opera', text: 'Opera' },{  id: 'Science', text: 'Science' },{  id: 'Casino', text: 'Casino' },{  id: 'Volleyball', text: 'Volleyball' },{  id: 'American', text: 'American' },
				{ id: 'Histic', text: 'Histic' },{  id: 'Sculpture', text: 'Sculpture' },{  id: 'BBQ', text: 'BBQ' },{  id: 'Memial', text: 'Memial' },{  id: 'Golf', text: 'Golf' },{  id: 'Concert', text: 'Concert' },{  id: 'Office', text: 'Office' },{  id: 'Field', text: 'Field' },
				{ id: 'House', text: 'House' },{  id: 'Library', text: 'Library' },{  id: 'General', text: 'General' },{  id: 'Martial', text: 'Martial' },{  id: 'College', text: 'College' },{  id: 'Roller', text: 'Roller' },{  id: 'Church', text: 'Church' },{  id: 'Spts', text: 'Spts' },
				{ id: 'Boat', text: 'Boat' },{  id: 'Hockey', text: 'Hockey' },{  id: 'City', text: 'City' },{  id: 'Racecourse', text: 'Racecourse' },{  id: 'Basketball', text: 'Basketball' },{  id: 'Court', text: 'Court' },{  id: 'Space', text: 'Space' },{  id: 'Movie', text: 'Movie' },
				{ id: 'Tennis', text: 'Tennis' },{  id: 'Cemetery', text: 'Cemetery' },{  id: 'Attraction', text: 'Attraction' },{  id: 'Other', text: 'Other' },{  id: 'Convention', text: 'Convention' },{  id: 'Soccer', text: 'Soccer' },{  id: 'Beach', text: 'Beach' },
				{ id: 'Brewery', text: 'Brewery' },{  id: 'Stables', text: 'Stables' },{  id: 'Garden', text: 'Garden' },{  id: 'Pedestrian', text: 'Pedestrian' },{  id: 'Outdos', text: 'Outdos' },{  id: 'Exhibit', text: 'Exhibit' },{  id: 'Crafts', text: 'Crafts' },
				{ id: 'Jazz', text: 'Jazz' },{  id: 'Lab', text: 'Lab' },{  id: 'Skate', text: 'Skate' },{  id: 'Flea', text: 'Flea' },{  id: 'Rental', text: 'Rental' },{  id: 'Hall', text: 'Hall' },{  id: 'Great', text: 'Great' },{  id: 'Rugby', text: 'Rugby' },{  id: 'Room', text: 'Room' },
				{ id: 'Medical', text: 'Medical' },{  id: 'Village', text: 'Village' },{  id: 'Dog', text: 'Dog' },{  id: 'Nightclub', text: 'Nightclub' },{  id: 'Winery', text: 'Winery' },{  id: 'Monument', text: 'Monument' },{  id: 'Neighbhood', text: 'Neighbhood' },
				{ id: 'Bridge', text: 'Bridge' },{  id: 'Kart', text: 'Kart' },{  id: 'Site', text: 'Site' },{  id: 'Club', text: 'Club' },{  id: 'Street', text: 'Street' },{  id: 'Radio', text: 'Radio' },{  id: 'Multiplex', text: 'Multiplex' },{  id: 'Pitch', text: 'Pitch' },{  id: 'Clothing', text: 'Clothing'}
            ],
			add_dep: '',
			j_dep: '',
			h_dep: '',
			add_arr: '',
			j_arr: '',
			h_arr: '',
			escales: '',
			mode: '',
			optimisation: 'affinity',
			t_max: '',
			d_max: '',
			max_escales: '',
			resultat: [],
			data: [],
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
		this.handleChangeAdd_dep = this.handleChangeAdd_dep.bind(this);
		this.handleChangeJ_dep = this.handleChangeJ_dep.bind(this);
		this.handleChangeH_dep = this.handleChangeH_dep.bind(this);
		this.handleChangeAdd_arr = this.handleChangeAdd_arr.bind(this);
		this.handleChangeJ_arr = this.handleChangeJ_arr.bind(this);
		this.handleChangeH_arr = this.handleChangeH_arr.bind(this);
		this.handleChangeEscales = this.handleChangeEscales.bind(this);
		this.handleChangeMode = this.handleChangeMode.bind(this);
		this.handleChangeOptimisation = this.handleChangeOptimisation.bind(this);
		this.handleChangeMax_escales = this.handleChangeMax_escales.bind(this);
		this.handleChangeT_max = this.handleChangeT_max.bind(this);
		this.handleChangeD_max = this.handleChangeD_max.bind(this);
		this.handleChangeTags = this.handleChangeTags.bind(this);
		this.sendFormInformation = this.sendFormInformation.bind(this);
		this.handleResultat = this.handleResultat.bind(this);
    }
	
	handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
    }


	handleChangeAdd_dep(event) {
		this.setState({add_dep: event.target.value});
	}
	
	handleChangeJ_dep(event) {
		this.setState({j_dep: event.target.value});
	}	

	handleChangeH_dep(event) {
		this.setState({h_dep: event.target.value});
	}
	
	handleChangeAdd_arr(event) {
		this.setState({add_arr: event.target.value});
	}
	
	handleChangeJ_arr(event) {
		this.setState({j_arr: event.target.value});
	}
	
	handleChangeH_arr(event) {
		this.setState({h_arr: event.target.value});
	}
	
	handleChangeEscales(event) {
		this.setState({escales: event.target.value});
	}
	
	handleChangeMode(event) {
		this.setState({mode: event.target.value});
	}
	
	handleChangeOptimisation(event) {
		this.setState({optimisation: event.target.value});
	}
	
	handleChangeMax_escales(event) {
		this.setState({max_escales: event.target.value});
	}
	
	handleChangeT_max(event) {
		this.setState({t_max: event.target.value});
	}
	
	handleChangeD_max(event) {
		this.setState({d_max: event.target.value});
	}
	
	handleChangeTags(event) {
		this.setState({tags: event.target.value});
	}
	
	handleResultat(event) {
		this.setState({resultat: event.target.value});
	}
	




  sendFormInformation(event) {
	var tags_list=[]
	for (var i = 0; i < this.state.tags.length; i++) {
	tags_list[i]=this.state.tags[i].id;
	}
	event.preventDefault();
	//let formData = new FormData();
	var formData = new Headers();
	//alert(this.state.add_dep);
	formData.append('add_dep', 'Lille');
	formData.append('j_dep', this.state.j_dep);
	formData.append('h_dep', this.state.h_dep);
	formData.append('add_arr', this.state.add_arr);
	formData.append('j_arr', this.state.j_arr);
	formData.append('h_arr', this.state.h_arr);
	formData.append('escales', this.state.escales);
	formData.append('mode', this.state.mode);
	formData.append('optimisation', this.state.optimisation);
	formData.append('tags', tags_list);
	formData.append('t_max', this.state.t_max);
	formData.append('d_max', this.state.d_max);
	formData.append('max_escales', this.state.max_escales);
	var url = 'http://192.168.127.1:5000/auth/form?';
	var depart = 'add_dep='.concat(this.state.add_dep,'&');
	var result = depart.concat('j_dep=',this.state.j_dep,'&',
							'h_dep=', this.state.h_dep,'&',
							'add_arr=', this.state.add_arr,'&',
							'j_arr=', this.state.j_arr,'&',
							'h_arr=', this.state.h_arr,'&',
							'max_escales=', this.state.max_escales,'&',
							'escales=', this.state.escales,'&',
							'mode=', this.state.mode,'&',
							'optimisation=', this.state.optimisation,'&',
							'tags=', tags_list,'&',
							't_max=', this.state.t_max,'&',
							'd_max=', this.state.d_max);
	alert(result);
	console.log(tags_list)
	var request = new Request(url.concat(result), {method:'GET', headers : new Headers({
     'Authorization': 'Basic '+btoa('username:password'), 
     'Content-Type': 'application/x-www-form-urlencoded'
   },formData)});
// this.props.history.push({pathname : '/map',state : {detail : formData}})
//browserHistory.push('/map',{data : formData});
//	fetch('http://192.168.127.1:5000/auth/form?add_dep=Metz&add_arr=Bordeaux&escales=Paris&tags=Art&max_escales=3&optimisation=affinity&mode=driving&h_dep=08:00&h_arr=21:00&j_dep=01122018&j_arr=01122018&t_max=7200&d_max=300000', {method:'GET', mode:'no-cors', headers : new Headers(formData)})
	fetch(request)
	.then(function (response) {
    console.log(response);
    return response.json();
});
//	.then(response =>{response.json()})
 //   .then((data) => {
//    console.log(data);
//})
//	.then(response => response.json())
//	.then(data => this.state.data=data).then(console.log(data));
//	.then(data => console.log(data));

	//.then(({ res }) => this.setState({ resultat: res })).then(alert(this.state.resultat));
  
	/**
	
	.then(function(response) {
		let array = []; 
		var steps = {}; 
		let item = {}; 
		alert(response.json());
		for (var i = 0, emp; i < response.json().steps.length; i++) { 
			emp = response.json().steps[i]; 
			array.push(emp.ville); 
			array.push(emp.note);
			array.push(emp.temps); 
		}
		//alert(array);
		//browserHistory.push('/map');
		}).catch(function(err) {
			alert("1");
		});
		//.then(browserHistory.push('/map'));
		
		//return res.json();
		//alert(res.json());
		let array = []; 
		var steps = {}; 
		let item = {}; 
		for (var i = 0, emp; i < res.json().steps.length; i++) { 
			emp = res.json().steps[i]; 
			array.push(emp.ville); 
			array.push(emp.note);
			array.push(emp.temps); 
		}
		alert(array)
		return res.json();
		}).then(data => {
			const tab = data.results;
			this.tab = tab;
		});
	 **/
	} 
 
  render () {

	const {tags, suggestions} = this.state;
    return (
	<div>
	<video autoPlay muted loop id="myVideo">
	  <source src={video} type="video/mp4" />
	</video>
	<div id="parent"> 
		<div className="form_container">
		<Form >
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="add_dep"><b>Adresse de départ</b></label>
					<div className="col-sm-8">
						<Input value={this.state.add_dep} name="add_dep" required={true} placeholder="Adresse de départ" onChange={this.handleChangeAdd_dep} />
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="j_dep"><b>Jour de départ</b></label>
					<div className="col-sm-8">
						<Input type="date" value={this.state.j_dep} name="j_dep" required={true} onChange={this.handleChangeJ_dep} />
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="h_dep"><b>Heure de départ</b></label>
					<div className="col-sm-8">
						<Input type="time" value={this.state.h_dep} name="h_dep" required={true} onChange={this.handleChangeH_dep} />
					</div>
				</div>
			</div>			
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="add_arr"><b>Adresse d'arrivée</b></label>
					<div className="col-sm-8">
						<Input type="text" value={this.state.add_arr} name="add_arr" placeholder="Adresse d'arrivée" required={true} onChange={this.handleChangeAdd_arr} />
					</div>
				</div>
			</div>				
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="j_dep"><b>Jour d'arrivée</b></label>
					<div className="col-sm-8">
						<Input type="date" value={this.state.j_arr} name="j_arr" required={true} onChange={this.handleChangeJ_arr} />
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="h_arr"><b>Heure d'arrivée</b></label>
					<div className="col-sm-8">
						<Input type="time" value={this.state.h_arr} name="h_arr" required={true} onChange={this.handleChangeH_arr} />
					</div>
				</div>
			</div>			
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="max_escales"><b>Nombre d'escales souhaité</b></label>
					<div className="col-sm-8">
						<Input type="text" value={this.state.max_escales} name="max_escales" required={true} onChange={this.handleChangeMax_escales} />
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="escales"><b>Escales</b></label>
					<div className="col-sm-8">
						<Input type="text" value={this.state.escales} name="escales" onChange={this.handleChangeEscales} />
					</div>
				</div>
			</div>

			<div className="form-group" data-toogle="buttons">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="mode"><b>Moyen de transport</b></label>
					<div className="col-sm-8">
						<ul className="btn">
							<input type="radio" id="mode" name="mode" value="driving" checked={this.state.mode=='driving'}
							onChange={this.handleChangeMode}/>
							<label htmlFor="mode">Voiture</label>
					
						
							<input type="radio" id="mode" name="mode" value="transit" checked={this.state.mode=='transit'}
							onChange={this.handleChangeMode}/>
							<label htmlFor="mode">Transport en commun</label>
							
							<input type="radio" id="mode" name="mode" value="walking" checked={this.state.mode=='walking'}
							onChange={this.handleChangeMode}/>
							<label htmlFor="mode">A pied</label>

						</ul>
					</div>
				</div>
			</div>
			<div className="form-group" data-toogle="buttons">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="optimisation"><b>Optimisation</b></label>
					<div className="col-sm-8">
						<ul className="btn">
							<input type="radio" id="optimisation" name="optimisation" value="distance" checked={this.state.optimisation=='distance'}
							onChange={this.handleChangeOptimisation}/>
							<label htmlFor="optimisation">Distance</label>
					
						
							<input type="radio" id="optimisation" name="optimisation" value="time" checked={this.state.optimisation=='time'}
							onChange={this.handleChangeOptimisation}/>
							<label htmlFor="optimisation">Temps</label>
							
							<input type="radio" id="optimisation" name="optimisation" value="affinity" checked={this.state.optimisation=='affinity'}
							onChange={this.handleChangeOptimisation}/>
							<label htmlFor="optimisation">Affinités</label>
							
						</ul>
					</div>
				</div>
			</div>
			<div className="form-group">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="tags"><b>Tags</b></label>
					<div className="col-sm-8">
						<div>
							<ReactTags tags={tags}
								suggestions={suggestions}
								handleDelete={this.handleDelete}
								handleAddition={this.handleAddition}
								handleDrag={this.handleDrag}
								delimiters={delimiters}
								name="tags"
								id="tags" />
						</div>
					</div>
				</div>
			</div>
			<div className="form-group" data-toogle="buttons">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="t_max"><b>Durée maximale sans pause</b></label>
					<div className="col-sm-8">
						<ul className="btn">
							<input type="radio" id="t_max" name="t_max" value="0" checked={this.state.t_max=='0'}
							onChange={this.handleChangeT_max}/>
							<label htmlFor="t_max">Sans pause</label>
					
						
							<input type="radio" id="t_max" name="t_max" value="3600" checked={this.state.t_max=='3600'}
							onChange={this.handleChangeT_max}/>
							<label htmlFor="t_max">1h00</label>
							
							<input type="radio" id="t_max" name="t_max" value="7200" checked={this.state.t_max=='7200'}
							onChange={this.handleChangeT_max}/>
							<label htmlFor="t_max">2h00</label>
							
							<input type="radio" id="t_max" name="t_max" value="10800" checked={this.state.t_max=='10800'}
							onChange={this.handleChangeT_max}/>
							<label htmlFor="t_max">3h00</label>
						</ul>
					</div>
				</div>
			</div>
			<div className="form-group" data-toogle="buttons">
				<div className="row">
					<label className="control-label col-sm-3" htmlFor="d_max"><b>Distance maximale sans pause</b></label>
					<div className="col-sm-8">
						<ul className="btn">
							<input type="radio" id="d_max" name="d_max" value="0" checked={this.state.d_max=='0'}
							onChange={this.handleChangeD_max}/>
							<label htmlFor="d_max">Sans pause</label>
											
							<input type="radio" id="d_max" name="d_max" value="100000" checked={this.state.d_max=='100000'}
							onChange={this.handleChangeD_max}/>
							<label htmlFor="d_max">100km</label>
							
							<input type="radio" id="d_max" name="d_max" value="200000" checked={this.state.d_max=='200000'}
							onChange={this.handleChangeD_max}/>
							<label htmlFor="d_max">200km</label>
							
							<input type="radio" id="d_max" name="d_max" value="300000" checked={this.state.d_max=='300000'}
							onChange={this.handleChangeD_max}/>
							<label htmlFor="d_max">300km</label>
						</ul>
					</div>
				</div>
			</div>
				<div className="form-group">
					<div className="row">
						<div className="col-sm-8">
							<div className="col-sm-offset-3 col-sm-10">
								<input type="button" onClick={this.sendFormInformation} value="Submit" />
							</div>
						</div>
					</div>
				</div>
			</Form>
		</div>
	</div>
	</div>
    )
  }
};
export default withRouter(App); 


