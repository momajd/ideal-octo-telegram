import React from 'react';
import ApiUtils from './utils/api_utils';
import InputTabs from './input_tabs';
import {Tabs, Tab} from 'react-bootstrap';

class Truss extends React.Component {
  constructor() {
    super();
    this.state = {truss: {nodes: []}}; //use empty objects for initial render
  }

  componentDidMount() {
    let trussId = this.props.match.params.id;
    ApiUtils.getTruss(trussId, (truss) => this.setState({truss}));
  }

  render() {
    return (
      <div>
        <h3>{this.state.truss.name}</h3>
        <InputTabs truss={this.state.truss}/>
      </div>
    );
  }
}

export default Truss;
