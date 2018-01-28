import React from 'react';
import {Table, Button, Modal} from 'react-bootstrap';
import Draggable from 'react-draggable';
import ApiUtils from './utils/api_utils';
import NodeForm from './node_form';

class NodeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewNodeForm: false, showEditNodeForm: false, editingNode: ""};
  }

  handleNewNodeFormShow() {
    this.setState({showNewNodeForm: true});
  }

  handleNewNodeFormClose() {
    this.setState({showNewNodeForm: false});
  }

  handleEditNodeFormShow(e) {
    this.setState({showEditNodeForm: true});
  }

  handleEditNodeFormClose() {
    this.setState({showEditNodeForm: false});
  }

  render() {
    let {nodes} = this.props.truss;
    let nodeNumber = 1;
    let nodeRows = nodes.map(node => {
      return(
        <tr key={node.id}>
          <td onClick={this.handleEditNodeFormShow.bind(this)}><a>{nodeNumber++}</a></td>
          <td>{node.name}</td>
          <td>{node.x_coord}</td>
          <td>{node.y_coord}</td>
          <td>{node.z_coord}</td>
        </tr>
      );
    });

    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleNewNodeFormShow.bind(this)}>
          +Create Node
        </Button>

        <Modal bsSize="small" show={this.state.showNewNodeForm} onHide={this.handleNewNodeFormClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Node</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NodeForm
              createNode={this.props.createNode}
              closeModal={this.handleNewNodeFormClose.bind(this)}
              />
          </Modal.Body>
        </Modal>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>x</th>
              <th>y</th>
              <th>z</th>
            </tr>
          </thead>
          <tbody>
            {nodeRows}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default NodeIndex;
