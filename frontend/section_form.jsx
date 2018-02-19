import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class SectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {sectionName: "", area: ""};
  }

  handleSectionNameChange(event) {
    this.setState({sectionName: event.target.value});
  }

  handleAreaChange(event) {
    this.setState({area: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createSection(this.state.sectionName, this.state.area);
    this.setState({sectionName: "", area: ""});
  }

  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Section Name:</ControlLabel>
          <FormControl
            value={this.state.sectionName}
            onChange={this.handleSectionNameChange.bind(this)}
            placeholder="ex: S1"
            />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Area:</ControlLabel>
          <FormControl
            value={this.state.area}
            onChange={this.handleAreaChange.bind(this)}
            placeholder=""
            />
        </FormGroup>

        <Button bsStyle="primary" block type="submit" onClick={this.handleSubmit.bind(this)}>
          Submit
        </Button>
      </form>
    );
  }
}

export default SectionForm;
