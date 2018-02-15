import React from 'react';
import ApiUtils from './utils/api_utils';
import InputTabs from './input_tabs';
import {Tabs, Tab, Panel} from 'react-bootstrap';
import View from './three/view';

class Truss extends React.Component {
  constructor() {
    super();
    this.state = {
      truss: {nodes: [], materials: [], sections: []}, //for initial render
      errors: [],
      alerts: []
    };
  }

  componentDidMount() {
    let trussId = this.props.match.params.id;
    ApiUtils.getTruss(trussId, (truss) => {
      this.setState({truss});
      this.view = new View(truss);
      window.view = this.view; //TODO Remove global variable;
    });
  }

  createNode(nodeName, xCoord, yCoord, zCoord) {
    let successCallback = (node) => {
      this.state.truss.nodes.push(node);
      let truss = this.state.truss;
      this.setState({truss, errors: [], alerts: [`Node ${node.name} successfully created`] });
      this.view.addNode(node);
    };

    let errorCallback = (errors) => {
      this.setState({errors: errors.responseJSON, alerts: []});
    };

    ApiUtils.createNode(nodeName, xCoord, yCoord, zCoord, this.state.truss.id, successCallback,
      errorCallback);
  }

  deleteNode(nodeId) {
    if (confirm("Are you sure you want to delete this node?")) {
      ApiUtils.deleteNode(this.state.truss.id, nodeId, (node) => {
        let truss = this.state.truss;
        for (var i = 0; i < truss.nodes.length; i++) {
          if (node.id === truss.nodes[i].id) { break;}
        }

        truss.nodes.splice(i, 1);
        this.setState({truss});
        this.view.removeNode(node);
      });
    }
  }

  createMember() {

  }

  createSection() {

  }

  createMaterial(materialName, elasticModulus) {
    let successCallback = (material) => {
      this.state.truss.materials.push(material);
      let truss = this.state.truss;
      this.setState({truss, errors: [], alerts: [`${material.name} successfully created`]});
    };

    let errorCallback = (errors) => {
      this.setState({errors: errors.responseJSON, alerts: []});
    };

    ApiUtils.createMaterial(materialName, elasticModulus, this.state.truss.id, successCallback,
      errorCallback);
  }

  render() {
    return (
      <div className="truss-container">
        <h3>{this.state.truss.name}</h3>
        <div id="three-js-container"></div>
        <InputTabs truss={this.state.truss}
          createNode={this.createNode.bind(this)}
          errors={this.state.errors}
          alerts={this.state.alerts}
          deleteNode={this.deleteNode.bind(this)}
          createMember={this.createMember.bind(this)}
          createSection={this.createSection.bind(this)}
          createMaterial={this.createMaterial.bind(this)}
          />
      </div>
    );
  }
}

export default Truss;
