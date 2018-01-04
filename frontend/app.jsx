import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from 'react-router-dom';

// Components
import Index from './index';
import Truss from './truss';

class App extends React.Component {
  render() {
    return(
      <div>
        <Index/>
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
