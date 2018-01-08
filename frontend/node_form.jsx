import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class NodeForm extends React.Component {
  constructor() {
    super();
    this.state = {xinput: '', yinput: ''};

    this.handleCoordChangeX = this.handleCoordChangeX.bind(this);
    this.handleCoordChangeY = this.handleCoordChangeY.bind(this);
  }

  handleCoordChangeX (event) {
    this.setState({xinput: event.target.value});
  }

  handleCoordChangeY (event) {
    this.setState({yinput: event.target.value});
  }

  render() {
    return(
      <form>
        <FormGroup>
          <ControlLabel>X Coordinate:</ControlLabel>
          <FormControl
            value={this.state.xinput}
            onChange={this.handleCoordChangeX}
            placeholder="0"
            />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Y Coordinate:</ControlLabel>
          <FormControl
            value={this.state.yinput}
            onChange={this.handleCoordChangeY}
            placeholder="0"
            />
        </FormGroup>

        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default NodeForm;
