import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'
import { dateToTimestamp, dateToReadable } from '../Helpers/DateHelper'
import { allocationService } from '../API/AllocationAPI'
import { contractService } from '../API/ContractAPI'
import { employeeService } from '../API/EmployeeAPI'

class AllocationCreateDialogue extends Component {
    constructor(props) {
        super(props)
        let today = new Date();
        
        this.state = {
            startDate: new Date(),
            endDate: today.setDate(today.getDate() + 1),
            pensumPercentage: '',
            employeeId: '',
            showModal: false,
            contract: '',
            contracts: [],
            employees: [],
            ContractDisplay: '',
        }
    }

    componentDidMount() {
        contractService.getAll().then(
          contracts =>{
            this.setState({contracts: contracts})
          }
        )
        employeeService.getAll().then(
          employees => {
            employees = employees.filter(employee => employee.firstName !== 'ANONYMIZED' && employee.lastName !== 'ANONYMIZED' )
            this.setState({employees: employees})
            this.setState({employeeId: employees[0].id.toString()})
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
        this.setState({ [event.target.name]: event.target.value }, this.displayFilteredContract)
    }

    displayFilteredContract = () =>{
        let filteredContract
        if (this.state.employeeId && this.state.startDate && this.state.endDate && this.state.pensumPercentage) {
            filteredContract = this.state.contracts.find(contract =>{
                return dateToTimestamp(contract.startDate) <= dateToTimestamp(this.state.startDate)
                && dateToTimestamp(contract.endDate) >= dateToTimestamp(this.state.endDate)
                && parseInt(contract.employeeId) === parseInt(this.state.employeeId)
                && parseInt(contract.pensumPercentage) >= parseInt(this.state.pensumPercentage)
            }
            )
        }

        if (filteredContract) {
            this.setState({ contract: filteredContract, ContractDisplay: dateToReadable(filteredContract.startDate) + " - " + dateToReadable(filteredContract.endDate) + " (" + filteredContract.pensumPercentage + "%)" })

        } else {
            this.setState({ contract: '', ContractDisplay: " No contracts found" })
        }
    }

    onSubmit = event => {
        event.preventDefault()

        let allocation = {
            startDate: dateToTimestamp(this.state.startDate),
            endDate: dateToTimestamp(this.state.endDate),
            pensumPercentage: parseInt(this.state.pensumPercentage),
            employeeId: this.state.employeeId,
            contractId: this.state.contract.id,
            projectId: this.props.project.id
        }

        let self = this
        allocationService.create(allocation)
        .then(allocation => {
            self.props.createAllocation(allocation)
            self.clear()
        })

    }

    clear = () => {
        let today = new Date();
        this.setState({
            startDate: new Date(),
            endDate: today.setDate(today.getDate() + 1),
            pensumPercentage: '',
            ContractDisplay: '',
            employeeId: this.state.employees[0].id.toString(),
            showModal: false,
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
                    <Form>
                        <FormGroup row>
                            <Label md={2} for="startDate">Start Date</Label>
                            <Col md={10}>
                                <DatePicker name="startDate"  minDate={new Date(this.props.project.startDate)} maxDate={new Date(this.props.project.endDate)} value={new Date(this.state.startDate)} onChange={e => this.onChange({ target: { name: 'startDate', value: e } })} />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label md={2} for="endDate">End Date</Label>
                            <Col md={10}>
                                <DatePicker name="endDate" minDate={new Date(this.props.project.startDate)} maxDate={new Date(this.props.project.endDate)} value={new Date(this.state.endDate)} onChange={e => this.onChange({ target: { name: 'endDate', value: e } })} />
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