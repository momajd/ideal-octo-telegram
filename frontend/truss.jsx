import React from 'react';
import ApiUtils from './utils/api_utils';

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
      <div>{this.state.truss.name}</div>
    );
  }
}

export default Truss;
