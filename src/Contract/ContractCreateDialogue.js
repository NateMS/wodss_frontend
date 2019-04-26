import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'
import _ from 'lodash'
import DatePicker from 'react-date-picker'
import {contractService} from '../API/ContractAPI'
import { dateToTimestamp } from '../Helpers/DateHelper'

class ContractCreateDialogue extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            pensum: '',
            showModal: false
        }
    }
    
    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
      this.clear()
    }

    clear = () => {
      this.setState({ 
        startDate: new Date(),
        endDate: new Date(),
        pensum: '',
        showModal: false
     })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()

        let contract = ({
            startDate: dateToTimestamp(this.state.startDate),
            endDate: dateToTimestamp(this.state.endDate),
            pensumPercentage: this.state.pensum,
            employeeId: this.props.employee.id
        })

        let self = this

        contractService.create(contract)
          .then(contract => {
            self.props.create(contract)
          })
          .catch(error => console.error(error));
        this.clear()
    }

    render() {
        return (
          <div>
            <Button color="success" onClick={this.open} className='float-right' >Create Contract</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                {/* Edit {this.props.employee.firstName} {this.props.employee.lastName} */}
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
                          name="pensum"
                          id="pensum"
                          value={this.state.pensum}
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


export default ContractCreateDialogue