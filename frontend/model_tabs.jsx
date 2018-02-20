import React from 'react';
import NodeIndex from './node_index';
import MaterialIndex from './material_index';
import SectionIndex from './section_index';
import MemberIndex from './member_index';
import {Tabs, Tab} from 'react-bootstrap';

class ModelTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {key: 1};
  }

  handleTabSelect(key) {
    this.setState({key});
  }

  render() {

    return (
      <Tabs activeKey={this.state.key} onSelect={this.handleTabSelect.bind(this)} id="input-tabs">
      	<Tab eventKey={1} title="Nodes">
          <NodeIndex truss={this.props.truss}
            createNode={this.props.createNode}
            deleteNode={this.props.deleteNode}
            errors={this.props.errors}
            alerts={this.props.alerts}/>
      	</Tab>
        <Tab eventKey={2} title="Materials">
          <MaterialIndex truss={this.props.truss}
            createMaterial={this.props.createMaterial}
            deleteMaterial={this.props.deleteMaterial}
            errors={this.props.errors}
            alerts={this.props.alerts}/>
        </Tab>
        <Tab eventKey={3} title="Sections">
          <SectionIndex truss={this.props.truss}
            createSection={this.props.createSection}
            deleteSection={this.props.deleteSection}
            errors={this.props.errors}
            alerts={this.props.alerts}/>
        </Tab>
      	<Tab eventKey={4} title="Members">
      		<MemberIndex truss={this.props.truss}/>
      	</Tab>
      </Tabs>
    );
  }
}

export default ModelTabs;
