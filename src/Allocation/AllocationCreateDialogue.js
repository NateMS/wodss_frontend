import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'
import { dateToTimestamp } from '../Helpers/DateHelper'
import { allocationService } from '../API/AllocationAPI'
import { contractService } from '../API/ContractAPI'
import { employeeService } from '../API/EmployeeAPI'
import { Alert } from '../Components/Alert/Alert'

class AllocationCreateDialogue extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            pensumPercentage: '',
            employeeId: '',
            showModal: false,
            contract: '',
            contracts: [],
            employees: [],
            contractDisplay: '',
            alert: ''
        }
    }

    componentDidMount() {
        contractService.getAll().then(
          contracts =>{
            this.setState({contracts: contracts})
          }
        )
        employeeService.getAll("DEVELOPER").then(
          employees => {
            this.setState({employees: employees})
            this.setState({employeeId: employees[0].id})
          }
        )
    }

    open = () => {
        this.setState({ showModal: true })
    }

    close = () => {
        this.clear()
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })

        let filteredContract = null
        if (this.state.employeeId && this.state.startDate && this.state.endDate && this.state.pensumPercentage) {
            filteredContract = this.state.contracts.find(contract =>
                contract.startDate >= this.state.startDate
                && contract.endDate <= this.state.endDate
                && contract.employeeId === this.state.employeeId
                && contract.pensumPercentage <= this.state.pensumPercentage
            )
            
             console.log(filteredContract);
        }

        if (filteredContract) {
            this.setState({ ContractId: filteredContract.id, ContractDisplay: filteredContract.startDate + " - " + filteredContract.endDate + " (" + filteredContract.pensumPercentage + "%)" })
        } else {
            this.setState({ ContractId: '', ContractDisplay: " No contracts found" })
        }
    }

    onSubmit = event => {
        event.preventDefault()

        let allocation = {
            startDate: dateToTimestamp(this.state.startDate),
            endDate: dateToTimestamp(this.state.endDate),
            pensumPercentage: parseInt(this.state.pensumPercentage),
            employeeId: this.state.employeeId,
            contractId: this.state.contractId,
        }

        let messages = []

        if (this.state.startDate >= this.state.endDate) {
            messages.push("Start date can't be same or bigger than end date")
        }

        if (this.state.startDate < this.props.project.startDate) {
            messages.push("Start date smaller than project start date")
        }

        if (this.state.endDate < this.props.project.endDate) {
            messages.push("End date smaller than project end date")
        }

        if (parseInt(this.state.pensumPercentage) === 0) {
            messages.push("Please set a valid pensum")
        }

        if (!this.state.employeeId) {
            messages.push("Please select an employee")
        }

        if (!this.state.contractId) {
            messages.push("No valid contract found")
        }

        if (messages.length > 0) {
            this.setState({ alert: <Alert type="danger" messages={messages}/>})
        } else {
            allocationService.create(allocation)
            .then(allocation => {
                console.log(allocation)
                this.props.create(allocation)
            })

        this.clear()
        } 
    }

    clear = () => {
        this.setState({
            startDate: new Date(),
            endDate: new Date(),
            pensumPercentage: '',
            ContractDisplay: '',
            employeeId: 0,
            showModal: false,
            alert: ''
        })
    }

    render() {
        return <Col md={6}>
            <Button color="success" onClick={this.open} className='float-right' >add developer</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg"
                autoFocus={false}>
                <ModalHeader toggle={this.close} >
                    Add developer to project '{this.props.project.name}'
          </ModalHeader>
                <ModalBody>
                    {this.state.alert}
                    <Form>
                        <FormGroup row>
                            <Label md={2} for="startDate">Start Date</Label>
                            <Col md={10}>
                                <DatePicker name="startDate" value={new Date(this.state.startDate)} onChange={e => this.onChange({ target: { name: 'startDate', value: e } })} />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label md={2} for="endDate">End Date</Label>
                            <Col md={10}>
                                <DatePicker name="endDate" value={new Date(this.state.endDate)} onChange={e => this.onChange({ target: { name: 'endDate', value: e } })} />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label md={2} for="pensum">Pensum</Label>
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

                        <FormGroup row>
                            <Label md={2} for="employee">Employee</Label>
                            <Col md={9}>
                                <select name="employeeId" id="employee" value={this.state.employeeId} onChange={this.onChange} >
                                    {
                                        this.state.employees.map(employee =>
                                            <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName}</option>
                                        )}
                                </select>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label md={12} for="contract">Contract: {this.state.ContractDisplay}</Label>
                        </FormGroup>

                        <FormGroup>
                            <Col className="clearfix" style={{ padding: '.2rem' }}>
                                <Button className="float-right" color="success" onClick={this.onSubmit}>Save</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </Col>
    }
}

export default AllocationCreateDialogue;