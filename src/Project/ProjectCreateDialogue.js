import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'
import { projectService } from '../API/ProjectAPI'
import { dateToReadable, dateToTimestamp } from '../Helpers/DateHelper'

class ProjectCreateDialog extends Component {

  constructor(props) {
    super(props)
    this.state = { name: '', projectManagerId: '', ftePercentage: '', startDate: '', endDate: '', showModal: false }
  }

  open = () => {
    this.setState({ showModal: true })
  }

  close = () => {
    this.setState({ showModal: false })
    this.clear()
  }

  clear = () => {
    this.setState({ name: '', projectManagerId: '', ftePercentage: '', startDate: '', endDate: '' })
  }

  onChange = event => {
    // [event.target.name]: Computed property names, siehe https://mzl.la/1GIMi82
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault()
    let project = ({
      'name': this.state.name,
      'ftePercentage': this.state.ftePercentage,
      'startDate': dateToTimestamp(this.state.startDate),
      'endDate': dateToTimestamp(this.state.endDate),
      'projectManagerId': this.state.projectManagerId
    })


    projectService.create(project)
      .then(project => {
        // this.props.create(project)
        this.setState({ showModal: false })
        this.clear();
      })
      .catch(error => console.log('' + error))
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.open} className='float-right'>Add Project</Button>
        <Modal isOpen={this.state.showModal} toggle={this.close} size="lg"
          autoFocus={false}>
          <ModalHeader toggle={this.close} >
            Create Project
              </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label md={3} for="formName">
                  Name
                     </Label>
                <Col md={9}>
                  <Input type="text" name="name" value={this.state.name} id="formName" onChange={this.onChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={3} for="formFTE">
                  FTE
                     </Label>
                <Col md={9}>
                  <Input type="text" name="ftePercentage" value={this.state.ftePercentage} id="formFTE" onChange={this.onChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={3} for="formStartDate">
                  Start Date
                     </Label>
                <Col md={9}>
                  <Input type="text" name="startDate" value={this.state.startDate} id="formStartDate" onChange={this.onChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={3} for="formEndDate">
                  End Date
                     </Label>
                <Col md={9}>
                  <Input type="text" name="endDate" value={this.state.endDate} id="formEndDate" onChange={this.onChange} />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={3} for="formPM">
                  Project Manager
                     </Label>
                <Col md={9}>
                  <select name="projectManagerId" id="formPM" value={this.state.projectManagerId} onChange={this.onChange} >
                    {this.props.pms.map(pm =>
                      <option key={pm.id} value={pm.id}>{pm.firstName} {pm.lastName}</option>
                    )}
                  </select>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col className="clearfix" style={{ padding: '.2rem' }}>
                  <Button className="float-right" color="secondary" onClick={this.onSubmit}>Save</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ProjectCreateDialog
