import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from 'react-router-dom';

// Components
import Index from './index';

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
        <Route path="/" component={App}/>
      </HashRouter>
    ), document.getElementById('root'));
});
