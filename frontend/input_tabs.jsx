import React from 'react';
import NodeIndex from './node_index';
import MaterialIndex from './material_index';
import {Tabs, Tab} from 'react-bootstrap';

class InputTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Tabs defaultActiveKey={1} id="input-tabs">
      	<Tab eventKey={1} title="Nodes">
          <NodeIndex truss={this.props.truss}
            createNode={this.props.createNode}
            deleteNode={this.props.deleteNode}
            errors={this.props.errors}
            alerts={this.props.alerts}
            />
      	</Tab>
        <Tab eventKey={2} title="Materials">
          <MaterialIndex truss={this.props.truss} createMaterial={this.props.createMaterial}/>
        </Tab>
        <Tab eventKey={3} title="Sections">
          Tab 3 content
        </Tab>
      	<Tab eventKey={4} title="Members">
      		Tab 4 content
      	</Tab>
      </Tabs>
    );
  }
}

export default InputTabs;
