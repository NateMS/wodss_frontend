import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'
import { projectService } from '../API/ProjectAPI'
import { dateToReadable, dateToTimestamp } from '../Helpers/DateHelper'
import DatePicker from 'react-date-picker'

class ProjectCreateDialog extends Component {

  constructor(props) {
    super(props)
    this.state = { name: '', projectManagerId: '', ftePercentage: '', startDate: new Date(), endDate: new Date(), showModal: false }
  }

  open = () => {
    if (this.props.pms) {
      this.setState({ projectManagerId: this.props.pms[0].id, showModal: true })
    } else {
      this.setState({ showModal: true })
    }
  }

  componentDidMount() {
   // this.setState({ projectManagerId: this.props.pms[0].id })
  }

  close = () => {
    this.clear()
    this.setState({ showModal: false })
  }

  clear = () => {
    this.state = { name: '', projectManagerId: '', ftePercentage: '', startDate: new Date(), endDate: new Date() }
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = event => {
    event.preventDefault()
    let project = {
      name: this.state.name,
      ftePercentage: this.state.ftePercentage,
      startDate: dateToTimestamp(this.state.startDate),
      endDate: dateToTimestamp(this.state.endDate),
      projectManagerId: this.state.projectManagerId
    }

    console.log(project)

    let self = this
    projectService.create(project)
      .then(project => {
        console.log(project)
        self.props.create(project)
        self.setState({ showModal: false })
        self.clear();
      })
  }

  render() {
    
    return (
      <div>
        <Button color="success" onClick={this.open} className='float-right btn-list-btn'>Add Project</Button>
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
                  <DatePicker name="startDate" value={this.state.startDate} onChange={e => this.onChange({target: {name: 'startDate', value:e}})}/>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={3} for="formEndDate">
                  End Date
                     </Label>
                <Col md={9}>
                <DatePicker name="endDate" value={this.state.endDate} onChange={e => this.onChange({target: {name: 'endDate', value:e}})}/>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={3} for="formPM">
                  Project Manager
                     </Label>
                <Col md={9}>
                  <select name="projectManagerId" id="formPM" value={this.state.projectManagerId} onChange={this.onChange} >
                    { 
                      this.props.pms.map(pm =>
                      <option key={pm.id} value={pm.id}>{pm.firstName} {pm.lastName}</option>
                    )}
                  </select>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col className="clearfix" style={{ padding: '.2rem' }}>
                  <Button className="float-right" color="success" onClick={this.onSubmit}>Save</Button>
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
