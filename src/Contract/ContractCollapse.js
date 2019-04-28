import React, { Component } from 'react'
import { Button, Collapse, Card, CardBody } from 'reactstrap'
import { allocationService } from '../API/AllocationAPI'
import AllocationTable from '../Allocation/AllocationTable';
import { dateToReadable } from '../Helpers/DateHelper'
import { Col } from 'reactstrap';
import './ContractCollapse.css';
import _ from 'lodash'

class ContractCollapse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false,
            allocations: []
        }

        let contract = this.props.contract
        allocationService.getAll({ employeeId: this.props.contract.employeeId })
            .then(allocations => {
                allocations = allocations.filter(a => a.contractId === contract.id)
                this.setState({ allocations: allocations })
            })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    update = (allocation) => {
        this.setState({ allocations: _.map(this.state.allocations, a => a.id === allocation.id ? allocation : a) })
    }

    render() {
        return <div key={this.props.contract.id} className="row contract-collapse">
            <Col md={12}>
                <Button name="colllapseBtn" color="secondary" onClick={this.toggle}>{dateToReadable(this.props.contract.startDate)} - {dateToReadable(this.props.contract.endDate)} Pensum: {this.props.contract.pensumPercentage}%</Button>
                <Collapse isOpen={this.state.collapse} >
                    <Card>
                        <CardBody>
                            <AllocationTable allocations={this.state.allocations} employeeId={this.props.contract.employeeId} editable={true} projectColumn={true} contractId={this.props.contract.contractId} update={this.update} deleteAllocation={this.props.deleteAllocation}/>
                        </CardBody>
                    </Card>
                </Collapse>
            </Col>

        </div>
    }
}

export default ContractCollapse