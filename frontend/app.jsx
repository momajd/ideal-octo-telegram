import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from 'react-router-dom';

// Components
import TrussIndex from './truss_index';
import Truss from './truss';

// TODO remove from window
import ApiUtils from './utils/api_utils';
window.apiUtils = ApiUtils;

class App extends React.Component {
  render() {
    return(
      <div>
        <TrussIndex/>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render((
      <HashRouter>
        <div>
          <Route exact path="/" component={App}/>
          <Route path="/trusses/:id" component={Truss}/>
        </div>
      </HashRouter>
    ), document.getElementById('root'));
});
