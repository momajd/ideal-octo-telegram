import React from 'react';
import {Table, Button, Modal, DropdownButton, MenuItem, Panel, Glyphicon} from 'react-bootstrap';
import ApiUtils from './utils/api_utils';
import MaterialForm from './material_form';
import Alerts from './alerts';

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

  handleDeleteMaterial(eventKey) {
    //
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
          <td>
            <DropdownButton bsSize="xsmall" title="Actions" id={material.id}>
              <MenuItem eventKey={material.id}> <Glyphicon glyph="edit"></Glyphicon> Edit</MenuItem>
              <MenuItem eventKey={material.id} onSelect={this.handleDeleteMaterial.bind(this)}>
                <Glyphicon glyph="remove"></Glyphicon> Delete
              </MenuItem>
            </DropdownButton>
          </td>
        </tr>
      );
    });

    return(
      <div className="container">
        <br></br>
        <Panel>
          <Panel.Heading>
            <Button bsStyle="success" className="pull-right"
              onClick={this.handleNewMaterialFormShow.bind(this)}>
              <Glyphicon glyph="plus"></Glyphicon> Create Material
            </Button>
            <Panel.Title>Materials</Panel.Title>
          </Panel.Heading>

          <Panel.Body>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Elastic Modulus</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {materialRows}
              </tbody>
            </Table>
          </Panel.Body>
        </Panel>

        <Modal show={this.state.showNewMaterialForm}
          onHide={this.handleNewMaterialFormClose.bind(this)}>

          <Modal.Header closeButton>
            <Modal.Title>
              <Glyphicon glyph="plus"></Glyphicon> Create New Material
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Alerts errors={this.props.errors} alerts={this.props.alerts}/>

            <MaterialForm createMaterial={this.props.createMaterial}
              closeModal={this.handleNewMaterialFormClose.bind(this)}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MaterialIndex;
