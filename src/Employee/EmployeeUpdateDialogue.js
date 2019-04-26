import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input} from 'reactstrap'
import _ from 'lodash'
import ContractCollapse from '../Contract/ContractCollapse'
import ContractCreateDialogue from '../Contract/ContractCreateDialogue';

class EmployeeUpdateDialogue extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            showModal: false,
            collapse: false
        }
        console.log(this.props.contracts)

        this.getContracts = this.getContracts.bind(this)
        this.getAllocations = this.getAllocations.bind(this)
    }
    
    getContracts = (employeeId) =>{
        return _.filter(this.props.contracts, function(c) { return c.employeeId === employeeId; })
    }
    
    getAllocations = (contractId) => {
        return _.filter(this.props.allocations, function(a) { return a.contractId === contractId})
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
      }    

    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
        this.setState({ title: '', description: '', showModal: false })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()
    }

    create = (contract) => {
      _.concat(this.props.contracts, contract)
      // TODO probably does not work
    }

    render() {
        return (
          <div>
            <Button color="primary" onClick={this.open} className='float-right' >Edit</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                Edit {this.props.employee.firstName} {this.props.employee.lastName}
              </ModalHeader>
              <ModalBody>
                 <Form>
                 <FormGroup row>
                     <Label md={2} for="formTitle">
                       E-Mail
                     </Label>
                     <Col md={10}>
                     <Input type="email" name="email" id="formEmail" value={ this.props.employee.emailAddress } onChange={ this.onChange } placeholder="name@domain.com" />
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="formTitle">
                       Contracts
                     </Label>
                     <ContractCreateDialogue create = {this.create} employee = {this.props.employee} />
                   </FormGroup>
    
                    {
                        this.getContracts(this.props.employee.id).map( contract => {
                            return  <ContractCollapse key={contract.id} contract={contract}/>
                        })
                    }

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

export default EmployeeUpdateDialogue
