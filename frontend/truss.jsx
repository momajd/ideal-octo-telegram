import React from 'react';
import ApiUtils from './utils/api_utils';
import InputTabs from './input_tabs';
import {Tabs, Tab} from 'react-bootstrap';

class Truss extends React.Component {
  constructor() {
    super();
    this.state = {truss: {}};
  }

  componentDidMount() {
    let trussId = this.props.match.params.id;
    ApiUtils.getTruss(trussId, (truss) => this.setState({truss: truss}));
  }

  render() {
    return (
      <div>
        <h3>{this.state.truss.name}</h3>
        <InputTabs/>
      </div>
    );
  }
}

export default Truss;
