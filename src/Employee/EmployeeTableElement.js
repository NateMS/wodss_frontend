import React from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import EmployeeUpdateDialogue from './EmployeeUpdateDialogue'

const EmployeeTableElement = ({ update, _delete, fte, employee }) => (
    <tr key={ employee.id } >
        <td>{ employee.firstName } { employee.lastName }</td>
        <td>{ employee.emailAddress }</td>
        <td>{ fte }</td>
        <td>{ employee.active.toString() }</td>
        <td>
            <EmployeeUpdateDialogue update={ update } employee={employee} fte={fte} />        
        </td>
        <td>
            <Button color='danger' onClick={ _.partial(_delete, employee.id) } className='float-right' >Delete</Button>
        </td>
    </tr>
)


export default EmployeeTableElement;
