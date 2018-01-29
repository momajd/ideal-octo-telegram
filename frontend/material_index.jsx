import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import ApiUtils from './utils/api_utils';
import MaterialForm from './material_form';

class MaterialIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewMaterialForm: false};
  }

  handleNewMaterialFormShow() {
    this.setState({showNewMaterialForm: true});
  }

  handleNewMaterialFormClose() {
    this.setState({showNewMaterialForm: false});
  }

  render() {
    let {materials} = this.props.truss;
    let materialNumber = 1;
    let materialRows = materials.map(material => {
      return(
        <tr key={material.id}>
          <td>{materialNumber++}</td>
          <td>{material.name}</td>
          <td>{material.elastic_modulus}</td>
        </tr>
      );
    });

    return(
      <div>
        <Button bsStyle="primary" onClick={this.handleNewMaterialFormShow.bind(this)}>
          +Create Material
        </Button>

        <Modal bsSize="small" show={this.state.showNewMaterialForm}
          onHide={this.handleNewMaterialFormClose.bind(this)}>

          <Modal.Header closeButton>
            <Modal.Title>Create New Material</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MaterialForm createMaterial={this.props.createMaterial}
              closeModal={this.handleNewMaterialFormClose.bind(this)}/>
          </Modal.Body>
        </Modal>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Elastic Modulus</th>
            </tr>
          </thead>
          <tbody>
            {materialRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MaterialIndex;
