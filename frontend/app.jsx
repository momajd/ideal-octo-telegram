import React from 'react';
import ReactDOM from 'react-dom';

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
  ReactDOM.render(<App/>, document.getElementById('root'));
});
