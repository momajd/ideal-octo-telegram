import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class MaterialForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {materialName: "", elasticModulus: ""};
  }

  handleMaterialNameChange(event) {
    this.setState({materialName: event.target.value});
  }

  handleElasticModulusChange(event) {
    this.setState({elasticModulus: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createMaterial(this.state.materialName, this.state.elasticModulus);
    this.setState({materialName: "", elasticModulus: ""});
  }

  render() {
    return (
      <form>
        <FormGroup>
          <ControlLabel>Material Name:</ControlLabel>
          <FormControl
            value={this.state.materialName}
            onChange={this.handleMaterialNameChange.bind(this)}
            placeholder="ex: steel"
            />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Elastic Modulus:</ControlLabel>
          <FormControl
            value={this.state.elasticModulus}
            onChange={this.handleElasticModulusChange.bind(this)}
            placeholder="ex: 29000"
            />
        </FormGroup>

        <Button bsStyle="primary" block type="submit" onClick={this.handleSubmit.bind(this)}>
          Submit
        </Button>
      </form>
    );
  }
}

export default MaterialForm;
