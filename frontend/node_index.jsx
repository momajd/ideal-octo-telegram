import React from 'react';
import {Table, Button, Modal, DropdownButton, MenuItem, Panel, Glyphicon,
  Alert} from 'react-bootstrap';
import ApiUtils from './utils/api_utils';
import NodeForm from './node_form';

class NodeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewNodeForm: false, showEditNodeForm: false, showAlerts: false};
  }

  handleDeleteNode(eventKey) {
    this.props.deleteNode(eventKey);
  }

  handleNewNodeFormShow() {
    this.setState({showNewNodeForm: true});
  }

  handleNewNodeFormClose() {
    this.setState({showNewNodeForm: false, showAlerts: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length > 0 || nextProps.alerts.length > 0) {
      this.setState({showAlerts: true});
    }
  }

  handleEditNodeFormShow(e) {
    // TODO
  }

  handleEditNodeFormClose() {
    // TODO
  }

  handleDismissAlert() {
    this.setState({showAlerts: false});
  }

  render() {
    let {nodes} = this.props.truss;
    let nodeNumber = 1;

    let nodeRows = nodes.map(node => {
      return(
        <tr key={node.id}>
          <td>{nodeNumber++}</td>
          <td>{node.name}</td>
          <td>{node.x_coord}</td>
          <td>{node.y_coord}</td>
          <td>{node.z_coord}</td>
          <td>
            <DropdownButton bsSize="xsmall" title="Actions" id={node.id}>
              <MenuItem eventKey={node.id}> <Glyphicon glyph="edit"></Glyphicon> Edit</MenuItem>
              <MenuItem eventKey={node.id} onSelect={this.handleDeleteNode.bind(this)}>
                <Glyphicon glyph="remove"></Glyphicon> Delete
              </MenuItem>
            </DropdownButton>
          </td>
        </tr>
      );
    });

    let errors = this.props.errors.map( (message, index) => {
      return(<li key={index}>{message}</li>);
    });

    let errorAlert;
    if (this.state.showAlerts && errors.length > 0) {
      errorAlert = (
        <Alert bsStyle="danger" onDismiss={this.handleDismissAlert.bind(this)}>
          <h4>Errors :(</h4>
          {errors}
        </Alert>
      );
    }

    let alerts = this.props.alerts.map( (message, index) => {
      return(<li key={index}>{message}</li>);
    });

    let successAlert;
    if (this.state.showAlerts && alerts.length > 0) {
      successAlert = (
        <Alert bsStyle="success" onDismiss={this.handleDismissAlert.bind(this)}>
          {alerts}
        </Alert>);
    }

    return (
      <div className="container">
        <br></br>
        <Panel>
          <Panel.Heading>
            <Button bsStyle="success" className="pull-right"
              onClick={this.handleNewNodeFormShow.bind(this)}>
                <Glyphicon glyph="plus"></Glyphicon> Create Node
            </Button>
            <Panel.Title>Nodes</Panel.Title>

          </Panel.Heading>
          <Panel.Body>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>x</th>
                  <th>y</th>
                  <th>z</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {nodeRows}
              </tbody>
            </Table>
          </Panel.Body>
        </Panel>

        <Modal show={this.state.showNewNodeForm}
          onHide={this.handleNewNodeFormClose.bind(this)}>

          <Modal.Header closeButton>
            <Modal.Title><Glyphicon glyph="plus"></Glyphicon> Create New Node
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {errorAlert}
            {successAlert}
            <NodeForm
              createNode={this.props.createNode}
              closeModal={this.handleNewNodeFormClose.bind(this)}
              />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default NodeIndex;
