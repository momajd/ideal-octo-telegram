import React from 'react';
import ApiUtils from './utils/api_utils';
import InputTabs from './input_tabs';
import {Tabs, Tab, Panel} from 'react-bootstrap';
import View from './three/view';

class Truss extends React.Component {
  constructor() {
    super();
    this.state = {truss: {nodes: [], materials: [], sections: []}}; // for initial render
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
    ApiUtils.createNode(nodeName, xCoord, yCoord, zCoord, this.state.truss.id, (node) => {
      this.state.truss.nodes.push(node);
      let truss = this.state.truss;
      this.setState({truss});
      this.view.addNode(node);
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
          createMember={this.createMember.bind(this)}
          createSection={this.createSection.bind(this)}
          createMaterial={this.createMaterial.bind(this)}
          />
      </div>
    );
  }
}

export default Truss;
