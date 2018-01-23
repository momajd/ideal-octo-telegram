import React from 'react';
import ApiUtils from './utils/api_utils';
import InputTabs from './input_tabs';
import {Tabs, Tab} from 'react-bootstrap';
import View from './utils/three_js_view';

class Truss extends React.Component {
  constructor() {
    super();
    this.state = {truss: {nodes: []}}; //use empty objects for initial render
  }

  componentDidMount() {
    let trussId = this.props.match.params.id;
    ApiUtils.getTruss(trussId, (truss) => {
      this.setState({truss});
      this.view = new View(truss);
    });
  }

  createNode(xCoord, yCoord) {
    ApiUtils.createNode(xCoord, yCoord, this.state.truss.id, (node) => {
      this.state.truss.nodes.push(node);
      let truss = this.state.truss;
      this.setState({truss});
      this.view.addNode(node);
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.truss.name}</h3>
        <InputTabs truss={this.state.truss} createNode={this.createNode.bind(this)}/>
        <div id="scene3d"></div>
      </div>
    );
  }
}

export default Truss;
