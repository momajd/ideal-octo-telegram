import React from 'react';
import ApiUtils from './utils/api_utils';

class Index extends React.Component {
  constructor() {
      super();
      this.state = {trusses: []};
  }

  componentDidMount() {
    ApiUtils.getAllTrusses((trusses) => {
      this.setState({trusses: trusses});
    });
  }

  render() {
    let trusses = this.state.trusses.map(truss => {
        return <li key={truss.id}>{truss.name}</li>;
    });

    return (
      <div>
        {trusses}
      </div>
    );
  }
}

export default Index;
