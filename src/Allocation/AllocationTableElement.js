import React, { Component } from 'react'
import { dateToReadable } from '../Helpers/DateHelper'
import AllocationUpdateDialogue from './AllocationUpdateDialogue'
import { authenticationService } from '../Services/Authentication.service'

class AllocationTableElement extends Component {

    render() {

        let editable, nameColumn, projectColumn

        if (this.props.allocation.project) {
            if (this.props.editable 
                && (
                    (authenticationService.isPM() && this.props.allocation.project.projectManagerId === authenticationService.currentUser.id) 
                    || authenticationService.isAdmin())) {
                editable = <td>
                    <AllocationUpdateDialogue allocation={this.props.allocation} update={this.props.update} />
                </td>
            }
        }
       

        if (this.props.nameColumn) nameColumn = <td>{this.props.allocation.employee.firstName + " " + this.props.allocation.employee.lastName}</td>
        if (this.props.projectColumn && this.props.allocation.project) projectColumn = <td>{this.props.allocation.project.name}</td>

        return <tr key={this.props.allocation.id}>
            {nameColumn}
            {projectColumn}
            <td>{dateToReadable(this.props.allocation.startDate)}</td>
            <td>{dateToReadable(this.props.allocation.endDate)}</td>
            <td>{this.props.allocation.pensumPercentage}</td>
            {editable}
        </tr>
    }
}

export default AllocationTableElement;
