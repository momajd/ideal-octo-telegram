import React from 'react';
import ApiUtils from './utils/api_utils';
import {Table, Button, Modal} from 'react-bootstrap';
import NodeForm from './node_form';

class NodeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNodeForm: false};
  }

  handleNodeFormShow() {
    this.setState({showNodeForm: true});
  }

  handleNodeFormClose() {
    this.setState({showNodeForm: false});
  }

  render() {
    let {nodes} = this.props.truss;
    let nodeNumber = 1;
    let nodeRows = nodes.map(node => {
      return(
        <tr key={node.id}>
          <td>{nodeNumber++}</td>
          <td>{node.x_coord}</td>
          <td>{node.y_coord}</td>
        </tr>
      );
    });

    return (
      <div>
        <Button bsStyle="primary" onClick={this.handleNodeFormShow.bind(this)}>
          +Create Node
        </Button>

        <Modal show={this.state.showNodeForm} onHide={this.handleNodeFormClose.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Node</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NodeForm
              createNode={this.props.createNode}
              closeModal={this.handleNodeFormClose.bind(this)}
              />
          </Modal.Body>
        </Modal>

        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              <th>x</th>
              <th>y</th>
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
