import React, { Component } from 'react'
import { Container, Row, Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'
import _ from 'lodash'
import ContractCollapse from '../Contract/ContractCollapse'
import ContractCreateDialogue from '../Contract/ContractCreateDialogue';
import { employeeService } from '../API/EmployeeAPI'

class EmployeeUpdateDialogue extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      firstName: '',
      lastName: 'this.state.lastName',
      emailAddress: '',
      showModal: false,
      contracts: this.props.contracts
    }

    this.getAllocations = this.getAllocations.bind(this)
  }

  componentDidMount() {
    let employeeId = this.props.employee.id
    this.setState({
      active: this.props.employee.active,
      firstName: this.props.employee.firstName,
      lastName: this.props.employee.lastName,
      emailAddress: this.props.employee.emailAddress,
      contracts: this.getContracts(employeeId)
    })
  }

  getContracts = (employeeId) => {
    return _.filter(this.props.contracts, function (c) { return c.employeeId === employeeId; })
  }

  getAllocations = (contractId) => {
    return _.filter(this.props.allocations, function (a) { return a.contractId === contractId })
  }

  open = () => {
    this.setState({ showModal: true })
  }

  close = () => {
    this.setState({ title: '', description: '', showModal: false })
  }

  onChange = event => {
    console.log(this.state.active)
    this.setState({ [event.target.name]: event.target.value })
  }

  onCheckboxChange = event => {
    this.setState({ active: !this.state.active });
  }

  onSubmit = event => {
    event.preventDefault()

    let employee = {
      active: this.state.active,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailAddress: this.state.emailAddress,
      id: this.props.employee.id
    }
    let self = this
    employeeService.update(employee)
      .then(employee => self.props.update(employee))

    this.close()
  }

  create = (contract) => {
    this.setState({ contracts: [...this.state.contracts, contract] })
    this.props.add_contract(contract)
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.open} className='float-left btn-list-btn' >Edit</Button>
        <Modal isOpen={this.state.showModal} toggle={this.close} size="lg"
          autoFocus={false}>
          <ModalHeader toggle={this.close} >
            Edit {this.props.employee.firstName} {this.props.employee.lastName}
          </ModalHeader>
          <ModalBody>
            <Form>
              <Container>
                <FormGroup row>
                  <Label md={2} for="formFirstName">
                    Firstname
                     </Label>
                  <Col md={10}>
                    <Input type="text" name="firstName" id="formFirstName" value={this.state.firstName} onChange={this.onChange} />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label md={2} for="formLastName">
                    Lastname
                     </Label>
                  <Col md={10}>
                    <Input type="text" name="lastName" id="formLastName" value={this.state.lastName} onChange={this.onChange} />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label md={2} for="formTitle">
                    E-Mail
                     </Label>
                  <Col md={10}>
                    <Input type="email" name="emailAddress" id="formEmail" value={this.state.emailAddress} onChange={this.onChange} />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label md={2} for="formActive">
                    Active
                        </Label>
                  <Col md={10}>
                    <Input type="checkbox" name="active" id="formActive" onChange={this.onCheckboxChange} defaultChecked={this.state.active} />
                  </Col>
                </FormGroup>

                <Row>
                  <Col md={3}>
                    <h4>Contracts</h4>
                  </Col>
                  <Col md={9}>
                    <ContractCreateDialogue create={this.create} employee={this.props.employee} />
                  </Col>
                </Row>
                {
                  this.getContracts(this.props.employee.id).map(contract =>
                    <ContractCollapse key={contract.id} contract={contract} />
                  )
                }
              </Container>

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

export default EmployeeUpdateDialogue
