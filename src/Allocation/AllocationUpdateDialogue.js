import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import { dateToTimestamp } from '../Helpers/DateHelper'
import {allocationService} from '../API/AllocationAPI'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'

class AllocationUpdateDialogue extends Component {
    constructor(props) {
        super(props) // contractid
        this.state = {
            startDate: this.props.allocation.startDate,
            endDate: this.props.allocation.endDate,
            pensumPercentage: this.props.allocation.pensumPercentage,
            showModal: false
        }
    }

    open = () =>  {
      this.setState({ showModal: true })
    }

    close = () => {
      this.setState({showModal: false})
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()

        let allocation = {
          startDate: dateToTimestamp(this.state.startDate),
          endDate: dateToTimestamp(this.state.endDate),
          pensumPercentage: parseInt(this.state.pensumPercentage),
          contractId: this.props.allocation.contractId,
          projectId: this.props.allocation.projectId,
          id: this.props.allocation.id
        }
        
        let self = this
        allocationService.update(allocation)
          .then(allocation => {
            allocation.project = this.props.allocation.project
            self.props.update(allocation)
            self.close()
          })
    }
    render() {
        return (
          <div>
            <Button color="primary" onClick={this.open} className='float-left btn-list-btn' >Edit Allocation</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                Edit Allocation
              </ModalHeader>
              <ModalBody>
                 <Form>
                   <FormGroup row>
                     <Label md={2} for="startDate">
                       Start Date
                     </Label>
                     <Col md={10}>
                     <DatePicker name="startDate" value={new Date(this.state.startDate)} onChange={e => this.onChange({target: {name: 'startDate', value:e}})}/>
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="endDate">
                       End Date
                     </Label>
                     <Col md={10}>
                     <DatePicker name="endDate" value={new Date(this.state.endDate)} onChange={e => this.onChange({target: {name: 'endDate', value:e}})}/>
                        </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="pensum">
                      Pensum
                     </Label>
                     <Col md={2}>
                     <Input
                          type="number"
                          name="pensumPercentage"
                          id="pensum"
                          value={this.state.pensumPercentage}
                          onChange={this.onChange}
                        />
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

export default AllocationUpdateDialogue;