import React, {Component} from 'react'
import { Table } from 'reactstrap'
import AllocationTableElement from './AllocationTableElement'
import {authenticationService} from '../Services/Authentication.service'

class AllocationTable extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        
        let actionHeader
        if(authenticationService.isAdmin()) actionHeader = <th>Actions</th>

        return <section>
            <Table>
                <thead>
                    <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Pensum</th>
                        {actionHeader}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.allocations.map(allocation => {
                            return <AllocationTableElement key={allocation.id}
                                allocation={allocation}
                                employeeId={this.props.employeeId}
                                contractId={this.props.contractId}
                                update={this.props.update}
                            />

                        })
                    }
                </tbody>
            </Table>
        </section>
    }
}
export default AllocationTable;