import React, {Component} from 'react'
import { Table } from 'reactstrap'
import AllocationTableElement from './AllocationTableElement'
import {authenticationService} from '../Services/Authentication.service'

class AllocationTable extends Component {

    render() {
        
        let actionHeader, nameColumn
        if(this.props.editable && authenticationService.isPM()) actionHeader = <th>Actions</th>

        if (this.props.nameColumn) nameColumn = <th>Actions</th>

        return <section>
            <Table>
                <thead>
                    <tr>
                        {nameColumn}
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
                                editable={this.props.editable}
                                nameColumn={this.props.nameColumn}
                            />

                        })
                    }
                </tbody>
            </Table>
        </section>
    }
}
export default AllocationTable;