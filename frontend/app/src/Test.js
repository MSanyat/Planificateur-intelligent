import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Textarea from 'muicss/lib/react/textarea';
import Button from 'muicss/lib/react/button';

class Test extends React.Component {
	constructor(props) {
        super(props);
	}
  render() {
	console.log(this.props.location.state.villes);
    return (
      <Form>
        <legend>Title</legend>
        <Input placeholder= "" />
        <Input placeholder="Input 2" />
        <Textarea placeholder="Textarea" />
        <Button variant="raised">Submit</Button>
      </Form>
    );
  }
}

export default Test