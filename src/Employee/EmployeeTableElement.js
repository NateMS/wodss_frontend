import React from 'react'
import _ from 'lodash'

const EmployeeTableElement = ({ update, _delete, fte, employee }) => (
    <tr key={ employee.id } >
        <td>{ employee.firstName } { employee.lastName }</td>
        <td>{ employee.emailAddress }</td>
        <td>{ fte }</td>
    </tr>
)


export default EmployeeTableElement;