import React from 'react'
import _ from 'lodash'

const EmployeeTableElement = ({ update, _delete, employee }) => (
    <tr key={ employee.id } >
        <td>{ employee.firstName }</td>
        <td>{ employee.emailAddress }</td>
        <td>{ employee.lastName }</td>
    </tr>
)


export default EmployeeTableElement;