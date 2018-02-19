import React from 'react';
import {Table, Button, Modal, DropdownButton, MenuItem, Panel, Glyphicon} from 'react-bootstrap';
import Alerts from './alerts';
import SectionForm from './section_form';

class SectionIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showNewSectionForm: false};
  }

  handleNewSectionFormShow() {
    this.setState({showNewSectionForm: true});
  }

  handleNewSectionFormClose() {
    this.setState({showNewSectionForm: false});
  }

  handleDeleteSection(eventKey) {
    this.props.deleteSection(eventKey);
  }

  render() {
    let {sections} = this.props.truss;
    let sectionNumber = 1;
    let sectionRows = sections.map(section => {
      return(
        <tr key={section.id}>
          <td>{sectionNumber++}</td>
          <td>{section.name}</td>
          <td>{section.area}</td>
          <td>
            <DropdownButton bsSize="xsmall" title="Actions" id={section.id}>
              <MenuItem eventKey={section.id}> <Glyphicon glyph="edit"></Glyphicon> Edit</MenuItem>
              <MenuItem eventKey={section.id} onSelect={this.handleDeleteSection.bind(this)}>
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
              onClick={this.handleNewSectionFormShow.bind(this)}>
              <Glyphicon glyph="plus"></Glyphicon> Create Section
            </Button>
            <Panel.Title>Sections</Panel.Title>
          </Panel.Heading>

          <Panel.Body>
            <Table hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Area</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {sectionRows}
              </tbody>
            </Table>
          </Panel.Body>
        </Panel>

        <Modal show={this.state.showNewSectionForm}
          onHide={this.handleNewSectionFormClose.bind(this)}>

          <Modal.Header closeButton>
            <Modal.Title>
              <Glyphicon glyph="plus"></Glyphicon> Create New Section
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Alerts errors={this.props.errors} alerts={this.props.alerts}/>

            <SectionForm createSection={this.props.createSection}
              closeModal={this.handleNewSectionFormClose.bind(this)}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SectionIndex;
