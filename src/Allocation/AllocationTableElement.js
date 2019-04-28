import React, { Component } from 'react'
import { dateToReadable } from '../Helpers/DateHelper'
import AllocationUpdateDialogue from './AllocationUpdateDialogue'
import { authenticationService } from '../Services/Authentication.service'
import { Button} from 'reactstrap'
import _ from 'lodash'

class AllocationTableElement extends Component {

    render() {

        let editable, nameColumn, projectColumn, deleteBtn

        if (this.props.allocation.project) {
            if (this.props.editable 
                && (
                    (authenticationService.isPM() && this.props.allocation.project.projectManagerId === authenticationService.currentUser.id) 
                    || authenticationService.isAdmin())) {
                editable = <td>
                    <AllocationUpdateDialogue allocation={this.props.allocation} update={this.props.update} />
                </td>
                deleteBtn = <Button color='danger' onClick={_.partial(this.props.deleteAllocation, this.props.allocation.id)} className='float-left btn-list-btn' >Delete</Button>
            }
        }

        console.log(this.props.allocation)
       

        if (this.props.nameColumn && this.props.allocation.employee) nameColumn = <td>{this.props.allocation.employee.firstName + " " + this.props.allocation.employee.lastName}</td>
        if (this.props.projectColumn && this.props.allocation.project) projectColumn = <td>{this.props.allocation.project.name}</td>

        return <tr key={this.props.allocation.id}>
            {nameColumn}
            {projectColumn}
            <td>{dateToReadable(this.props.allocation.startDate)}</td>
            <td>{dateToReadable(this.props.allocation.endDate)}</td>
            <td>{this.props.allocation.pensumPercentage}</td>
            {editable}
            {deleteBtn}
        </tr>
    }
}

export default AllocationTableElement;
