import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'
import { projectService } from '../API/ProjectAPI'
import { dateToReadable, dateToTimestamp } from '../Helpers/DateHelper'
import DatePicker from 'react-date-picker'

class ProjectUpdateDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
          name: this.props.project.name,
          projectManagerId: this.props.project.projectManagerId,
          ftePercentage: this.props.project.ftePercentage,
          startDate: this.props.project.startDate,
          endDate: this.props.project.endDate,
          pms: this.props.pms.filter(pm => pm.active || pm.id === this.state.projectManagerId),
          showModal: false
        }
    }
    
    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
        this.setState({ showModal: false })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()

        let project = {
          id: this.props.project.id,
          name: this.state.name,
          ftePercentage: this.state.ftePercentage,
          startDate: dateToTimestamp(this.state.startDate),
          endDate: dateToTimestamp(this.state.endDate),
          projectManagerId: this.state.projectManagerId
        }

        console.log(project);

        let self = this
        projectService.update(project)
          .then(project => {
            self.props.update(project)
            self.setState({ showModal: false })
          })
    }

    render() {
        return (
          <span>
            <Button color="primary" onClick={this.open} className='float-left' >Edit</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                Edit Project '{this.state.name}'
              </ModalHeader>
              <ModalBody>
                 <Form>
                   <FormGroup row>
                     <Label md={3} for="formName">
                       Name
                     </Label>
                     <Col md={9}>
                       <Input type="text" name="name" value={ this.state.name } id="formName" onChange={ this.onChange } />
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
                      this.state.pms.map(pm =>
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
          </span>
        )
      }    
}

export default ProjectUpdateDialog
