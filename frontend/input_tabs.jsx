import React from 'react';
import NodeIndex from './node_index';
import {Tabs, Tab} from 'react-bootstrap';

class InputTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let nodes = this.props.truss.nodes.map(node => {
      return (<li key={node.id}>{node.x_coord}</li>);
    });

    return (
      <Tabs defaultActiveKey={1} id="input-tabs">
      	<Tab eventKey={1} title="Nodes">
          <NodeIndex truss={this.props.truss} createNode={this.props.createNode}/>
      	</Tab>
      	<Tab eventKey={2} title="Members">
      		Tab 2 content
      	</Tab>
      	<Tab eventKey={3} title="Materials">
      		Tab 3 content
      	</Tab>
      </Tabs>
    );
  }
}

export default InputTabs;
