import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';


class NodeForm extends React.Component {
  constructor() {
    super();
    this.state = {nodeName: '', xInput: '', yInput: '', zInput: ''};
  }

  handleNodeNameChange (event) {
    this.setState({nodeName: event.target.value});
  }

  handleCoordChangeX (event) {
    this.setState({xInput: event.target.value});
  }

  handleCoordChangeY (event) {
    this.setState({yInput: event.target.value});
  }

  handleCoordChangeZ (event) {
    this.setState({zInput: event.target.value});
  }

  handleSubmit (event) {
    event.preventDefault();
    this.props.createNode(this.state.nodeName, this.state.xInput, this.state.yInput, this.state.zInput);
    this.props.closeModal();
  }

  render() {
    return(
      <form>
        <FormGroup>
          <ControlLabel>Node Name:</ControlLabel>
          <FormControl
            value={this.state.nodeName}
            onChange={this.handleNodeNameChange.bind(this)}
            placeholder="0"
            />
        </FormGroup>

        <FormGroup>
          <ControlLabel>X Coordinate:</ControlLabel>
          <FormControl
            value={this.state.xInput}
            onChange={this.handleCoordChangeX.bind(this)}
            placeholder="0"
            />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Y Coordinate:</ControlLabel>
          <FormControl
            value={this.state.yInput}
            onChange={this.handleCoordChangeY.bind(this)}
            placeholder="0"
            />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Z Coordinate:</ControlLabel>
          <FormControl
            value={this.state.zInput}
            onChange={this.handleCoordChangeZ.bind(this)}
            placeholder="0"
            />
        </FormGroup>

        <Button type="submit" onClick={this.handleSubmit.bind(this)}>Submit</Button>
      </form>
    );
  }
}

export default NodeForm;
