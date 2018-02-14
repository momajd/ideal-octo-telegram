import React from 'react';
import {Alert} from 'react-bootstrap';

class Alerts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {show: false};
  }

  handleDismissAlert() {
    this.setState({show: false});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.length > 0 || nextProps.alerts.length > 0) {
      this.setState({show: true});
    }
  }


  render() {
    let errors = this.props.errors.map( (message, index) => {
      return(<li key={index}>{message}</li>);
    });

    let errorAlert;
    if (this.state.show && errors.length > 0) {
      errorAlert = (
        <Alert bsStyle="danger" onDismiss={this.handleDismissAlert.bind(this)}>
          <h4>Errors :(</h4>
          {errors}
        </Alert>
      );
    }

    let alerts = this.props.alerts.map( (message, index) => {
      return(<li key={index}>{message}</li>);
    });

    let successAlert;
    if (this.state.show && alerts.length > 0) {
      successAlert = (
        <Alert bsStyle="success" onDismiss={this.handleDismissAlert.bind(this)}>
          {alerts}
        </Alert>);
    }

    return (
      <div>
        {errorAlert}
        {successAlert}
      </div>
    );
  }
}


export default Alerts;
