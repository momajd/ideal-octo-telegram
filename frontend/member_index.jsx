import React from 'react';
import {Table, Button, Modal, DropdownButton, MenuItem, Panel, Glyphicon} from 'react-bootstrap';
import Alerts from './alerts';
import MaterialForm from './material_form';

class MemberIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewMemberForm: false};
  }

  handleNewMemberFormShow() {
    this.setState({showNewMemberForm: true});
  }

  handleNewMemberFormClose() {
    this.setState({showNewMemberForm: false});
  }

  handleDeleteMember(eventKey) {
    this.props.deleteMember(eventKey);
  }

  render() {
    let {members} = this.props.truss;
    let memberNumber = 1;
    let memberRows = members.map(member => {
      return(
        <tr key={member.id}>
          <td>{memberNumber++}</td>
          <td>{member.name}</td>
          <td>{member.near_node.name}</td>
          <td>{member.far_node.name}</td>
          <td>{member.material.name}</td>
          <td>{member.section.name}</td>
          <td>
            <DropdownButton bsSize="xsmall" title="Actions" id={member.id}>
              <MenuItem eventKey={member.id}> <Glyphicon glyph="edit"></Glyphicon> Edit</MenuItem>
              <MenuItem eventKey={member.id} onSelect={this.handleDeleteMember.bind(this)}>
                <Glyphicon glyph="remove"></Glyphicon> Delete
              </MenuItem>
            </DropdownButton>
          </td>
        </tr>
      );
    });

    return(
      <div className="container">
        <br></br>
        <Panel>
          <Panel.Heading>
            <Button bsStyle="success" className="pull-right"
              onClick={this.handleNewMemberFormShow.bind(this)}>
              <Glyphicon glyph="plus"></Glyphicon> Create Member
            </Button>
            <Panel.Title>Members</Panel.Title>
          </Panel.Heading>

          <Panel.Body>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Near Node</th>
                  <th>Far Node</th>
                  <th>Material</th>
                  <th>Section</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {memberRows}
              </tbody>
            </Table>
          </Panel.Body>
        </Panel>

        <Modal show={this.state.showNewMemberForm}
          onHide={this.handleNewMemberFormClose.bind(this)}>

          <Modal.Header closeButton>
            <Modal.Title>
              <Glyphicon glyph="plus"></Glyphicon> Create New Member
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Alerts errors={this.props.errors} alerts={this.props.alerts}/>

            <MaterialForm createMember={this.props.createMember}
              closeModal={this.handleNewMemberFormClose.bind(this)}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default MemberIndex;
