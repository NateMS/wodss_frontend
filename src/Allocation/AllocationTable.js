import React, { Component } from 'react'
import { Table } from 'reactstrap'
import AllocationTableElement from './AllocationTableElement'
import { authenticationService } from '../Services/Authentication.service'

class AllocationTable extends Component {

    deleteAllocation = () => {
        
    }

    render() {
        let actionHeader, nameColumn, projectColumn
        if (this.props.editable && authenticationService.isPM()) actionHeader = <th style={{ minWidth: '220px' }}>Actions</th>
        if (this.props.nameColumn) nameColumn = <th>Name</th>
        if (this.props.projectColumn) projectColumn = <th>Project</th>

        return <section>
            <Table>
                <thead>
                    <tr>
                        {nameColumn}
                        {projectColumn}
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
                                update={this.props.update}
                                editable={this.props.editable}
                                nameColumn={this.props.nameColumn}
                                projectColumn={this.props.projectColumn}
                                deleteAllocation={this.props.deleteAllocation}
                            />

                        })
                    }
                </tbody>
            </Table>
        </section>
    }
}
export default AllocationTable;