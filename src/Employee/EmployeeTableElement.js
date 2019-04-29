import React, { Component } from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import EmployeeUpdateDialogue from './EmployeeUpdateDialogue'
import EmployeeShowDialogue from './EmployeeShowDialogue'
import { authenticationService } from '../Services/Authentication.service'

class EmployeeTableElement extends Component {
    render() {

        let viewEditDialogue
        let deleteButton

        if (authenticationService.isAdmin()) {
            viewEditDialogue = <EmployeeUpdateDialogue add_contract={this.props.add_contract} update={this.props.update} employee={this.props.employee} fte={this.props.fte} contracts={this.props.contracts} allocations={this.props.allocations} deleteAllocation={this.props.deleteAllocation}/>
            if(authenticationService.currentUserValue().decoded.id !== this.props.employee.id)
                deleteButton = <Button color='danger' onClick={_.partial(this.props._delete, this.props.employee.id)} className='float-left btn-list-btn' >Delete</Button>
        } else {
            viewEditDialogue = <EmployeeShowDialogue employee={this.props.employee} fte={this.props.fte} contracts={this.props.contracts} allocations={this.props.allocations} />
        }

        return <tr key={this.props.employee.id} >
            <td>{this.props.employee.firstName} {this.props.employee.lastName}</td>
            <td>{this.props.employee.emailAddress}</td>
            <td>{this.props.fte}</td>
            <td>{this.props.employee.role}</td>
            <td>{this.props.employee.active ? 'active' : 'inactive'}</td>
            <td>
                {viewEditDialogue}
                {deleteButton}
            </td>
        </tr>

    }
}

export default EmployeeTableElement;
