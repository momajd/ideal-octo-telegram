import React from 'react';
import ApiUtils from './utils/api_utils';
import InputTabs from './input_tabs';
import {Tabs, Tab, Panel} from 'react-bootstrap';
import View from './three/view';

class Truss extends React.Component {
  constructor() {
    super();
    this.state = {
      truss: {nodes: [], materials: [], sections: []},
      nodeAlerts: []
    }; // for initial render
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
      this.setState({truss});
      this.view.addNode(node);
    };

    let errorCallback = (errors) => {
      this.setState({nodeAlerts: errors.responseJSON});
      setTimeout(() => {this.setState({nodeAlerts: []}); }, 5000);
    };

    ApiUtils.createNode(nodeName, xCoord, yCoord, zCoord, this.state.truss.id, successCallback,
      errorCallback);
  }

  deleteNode(nodeId) {
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

  createMember() {

  }

  createSection() {

  }

  createMaterial(materialName, elasticModulus) {
    ApiUtils.createMaterial(materialName, elasticModulus, this.state.truss.id, (material) => {
      this.state.truss.materials.push(material);
      let truss = this.state.truss;
      this.setState({truss});
    });
  }

  render() {
    return (
      <div className="truss-container">
        <h3>{this.state.truss.name}</h3>
        <div id="three-js-container"></div>
        <InputTabs truss={this.state.truss}
          createNode={this.createNode.bind(this)}
          nodeAlerts={this.state.nodeAlerts}
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
