import React, {Component} from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import EmployeeUpdateDialogue from './EmployeeUpdateDialogue'
import {authenticationService} from '../Services/Authentication.service'

class EmployeeTableElement extends Component {
    constructor(props){
        super(props)
    }

    render() {

        let viewDialogue
        let deleteButton

        if(authenticationService.isAdmin){
            viewDialogue = <EmployeeUpdateDialogue update={ this.props.update } employee={ this.props.employee } fte={this.props.fte} contracts = {this.props.contracts} allocations = { this.props.allocations } />        
            deleteButton = <Button color='danger' onClick={ _.partial(this.props._delete, this.props.employee.id) } className='float-right' >Delete</Button>
        } else {
            //TODO viewDialogue = <EmployeeShowDialogue ... />
        }
        
    return  <tr key={ this.props.employee.id } >
                <td>{ this.props.employee.firstName } { this.props.employee.lastName }</td>
                <td>{ this.props.employee.emailAddress }</td>
                <td>{ this.props.fte }</td>
                <td>{ this.props.employee.active.toString() }</td>

                <td>
                    {/* <PrivateRoute path='/employees' component={EmployeeUpdateDialogue} pdate={ update } employee={employee} fte={fte} contracts = {contracts} allocations = { allocations } /> */}
                    { viewDialogue }
                </td>
                <td>
                    { deleteButton }
                </td>
            </tr>

    }
}

export default EmployeeTableElement;
