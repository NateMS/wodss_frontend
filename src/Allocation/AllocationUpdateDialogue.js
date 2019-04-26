import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import { dateToTimestamp } from '../Helpers/DateHelper'
import {allocationService} from '../API/AllocationAPI'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'

class AllocationUpdateDialogue extends Component {
    constructor(props) {
        super(props) // contractid
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            pensumPercentage: '',
            showModal: false
        }
    }

    open = () =>  {
      this.setState({ showModal: true })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()

        let allocation = {

        }


    }

    render() {
        return (
          <div>
            <Button color="success" onClick={this.open} className='float-right' >Edit Allocation</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
              </ModalHeader>
              <ModalBody>
                 <Form>
                   <FormGroup row>
                     <Label md={2} for="startDate">
                       Start Date
                     </Label>
                     <Col md={10}>
                     <DatePicker name="startDate" value={this.state.startDate} onChange={e => this.onChange({target: {name: 'startDate', value:e}})}/>
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="endDate">
                       End Date
                     </Label>
                     <Col md={10}>
                     <DatePicker name="endDate" value={this.state.endDate} onChange={e => this.onChange({target: {name: 'endDate', value:e}})}/>
                        </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="pensum">
                      Pensum
                     </Label>
                     <Col md={10}>
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

export default AllocationUpdateDialogue;