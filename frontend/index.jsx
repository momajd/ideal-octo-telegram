import React from 'react';
import {Link} from 'react-router-dom';
import ApiUtils from './utils/api_utils';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {trusses: [], inputValue: ''};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({inputValue: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    ApiUtils.createTruss(this.state.inputValue, truss=> {
      let trusses = this.state.trusses;
      trusses.push(truss);
      this.setState({trusses});
    });

    this.setState({inputValue: ''});
  }

  componentDidMount() {
    ApiUtils.getAllTrusses(trusses => {
      this.setState({trusses});
    });
  }

  render() {
    let trusses = this.state.trusses.map(truss => {
      return (
          <li key={truss.id}>
            <Link to={`/trusses/${truss.id}`}>{truss.name}</Link>
          </li>
      );
    });

    return (
      <div>
        {trusses}
        <input type="text" value={this.state.inputValue} onChange={this.handleInputChange}></input>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Index;
