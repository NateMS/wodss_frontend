import React from 'react'
import { Table } from 'reactstrap'
import EmployeeTableElement from './EmployeeTableElement'

const EmployeeTable = ({ update, _delete, getFTE, emps }) => <section>
    <Table>
        <thead>
            <th>Name</th>
            <th>E-Mail</th>
            <th>FTE</th>
            <th>Actions</th>
        </thead>
        <tbody>
        { 
            emps.map(employee =>
                <EmployeeTableElement key={ employee.id } 
                                           update={ update }
                                           _delete={ _delete }
                                           fte = { employee.fte }
                                           employee={ employee } />) 
        }
        </tbody>
    </Table>
</section>

export default EmployeeTable;