import React, { Component } from 'react';
import './Register.css';
import { Button, Grid, Row, Col } from "react-bootstrap";
import { withRouter } from 'react-router';



class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendFormInformation = this.sendFormInformation.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  sendFormInformation(event){
	let formData = new FormData();
	formData.append('phrase', this.state.value);
	alert(this.state.value)
    fetch('http://10.2.68.50:5000/auth/welcome', {
        method: 'POST',
        body: formData
    })
  }

  render() {
    return (
      <form onSubmit={this.sendFormInformation}>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
  


export default withRouter(Welcome);
