import React from 'react';
import ApiUtils from './utils/api_utils';
import ModelTabs from './model_tabs';
import {Tabs, Tab, Panel} from 'react-bootstrap';
import View from './three/view';

class Truss extends React.Component {
  constructor() {
    super();
    this.state = {
      truss: {nodes: [], materials: [], sections: [], members: []}, //for initial render
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

  errorCallback(errors) {
    this.setState({errors: errors.responseJSON, alerts: []});
  }

  createNode(nodeName, xCoord, yCoord, zCoord) {
    let successCallback = (node) => {
      this.state.truss.nodes.push(node);
      let truss = this.state.truss;
      this.setState({truss, errors: [], alerts: [`Node ${node.name} successfully created`] });
      this.view.addNode(node);
    };

    ApiUtils.createNode(nodeName, xCoord, yCoord, zCoord, this.state.truss.id, successCallback,
      this.errorCallback.bind(this));
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

  createSection(sectionName, area) {
    let successCallback = (section) => {
      this.state.truss.sections.push(section);
      let truss = this.state.truss;
      this.setState({truss, errors: [], alerts: [`${section.name} successfully created`]});
    };

    ApiUtils.createSection(sectionName, area, this.state.truss.id, successCallback,
      this.errorCallback.bind(this));
  }

  deleteSection(sectionId) {
    if (confirm("Are you sure you want to delete this Section?")) {
      ApiUtils.deleteSection(this.state.truss.id, sectionId, (section) => {
        let truss = this.state.truss;
        for (var i = 0; i < truss.sections.length; i++) {
          if (section.id === truss.sections[i].id) {break;}
        }

        truss.sections.splice(i, 1);
        this.setState({truss});
      });
    }
  }

  createMaterial(materialName, elasticModulus) {
    let successCallback = (material) => {
      this.state.truss.materials.push(material);
      let truss = this.state.truss;
      this.setState({truss, errors: [], alerts: [`${material.name} successfully created`]});
    };

    ApiUtils.createMaterial(materialName, elasticModulus, this.state.truss.id, successCallback,
      this.errorCallback.bind(this));
  }

  deleteMaterial(materialId) {
    if (confirm("Are you sure you want to delete this Material?")) {
      ApiUtils.deleteMaterial(this.state.truss.id, materialId, (material) => {
        let truss = this.state.truss;
        for (var i = 0; i < truss.materials.length; i++) {
          if (material.id === truss.materials[i].id) {break;}
        }

        truss.materials.splice(i, 1);
        this.setState({truss});
      });
    }
  }

  render() {
    return (
      <div className="truss-container">
        <h3>{this.state.truss.name}</h3>
        <div id="three-js-container"></div>
        <ModelTabs truss={this.state.truss}
          errors={this.state.errors}
          alerts={this.state.alerts}
          createNode={this.createNode.bind(this)}
          deleteNode={this.deleteNode.bind(this)}
          createMember={this.createMember.bind(this)}
          createSection={this.createSection.bind(this)}
          deleteSection={this.deleteSection.bind(this)}
          createMaterial={this.createMaterial.bind(this)}
          deleteMaterial={this.deleteMaterial.bind(this)}
          />
      </div>
    );
  }
}

export default Truss;
