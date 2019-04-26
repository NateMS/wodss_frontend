import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Row, FormGroup, Label, Col, Input } from 'reactstrap'
import _ from 'lodash'
import ContractCollapse from '../Contract/ContractCollapse'
import { dateToReadable } from '../Helpers/DateHelper'

class EmployeeShowDialogue extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      collapse: false
    }

    this.getContracts = this.getContracts.bind(this)
    this.getAllocations = this.getAllocations.bind(this)
  }

  getContracts = (employeeId) => {
    return _.filter(this.props.contracts, function (c) { return c.employeeId === employeeId; })
  }

  getAllocations = (contractId) => {
    return _.filter(this.props.allocations, function (a) { return a.contractId === contractId })
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  open = () => {
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
        <Button color="secondary" onClick={this.open} className='float-right' >Show</Button>
        <Modal isOpen={this.state.showModal} toggle={this.close} size="lg"
          autoFocus={false}>
          <ModalHeader toggle={this.close} >
            Edit {this.props.employee.firstName} {this.props.employee.lastName}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md={2} >
                E-Mail
                     </Col>
              <Col md={10}>
                <p>
                  {this.props.employee.emailAddress}
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={2}>
                Contracts
                     </Col>
              <Col md={10}>
                {
                  this.getContracts(this.props.employee.id).map(contract => {
                    return <ContractCollapse key={contract.id} contract={contract} />
                  })
                }
              </Col>
            </Row>
            <Col className="clearfix" style={{ padding: '.2rem' }}>
              <Button className="float-right" color="secondary" onClick={this.close}>Close</Button>
            </Col>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default EmployeeShowDialogue
