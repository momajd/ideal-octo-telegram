import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';

class InputTabs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Tabs defaultActiveKey={1}>
      	<Tab eventKey={1} title="Nodes">
      		Tab 1 content
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
