import React from 'react'
import { Table } from 'reactstrap'
import EmployeeTableElement from './EmployeeTableElement'

const EmployeeTable = ({ update, _delete, fte, emps, contracts, allocations, add_contract}) => <section>
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>E-Mail</th>
                <th>FTE</th>
                <th>Active</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        { 
            emps.map(employee =>{
                if(employee.firstName !== 'ANONYMIZED' && employee.lastName !== 'ANONYMIZED'){
                    return <EmployeeTableElement key={ employee.id } 
                                           update={ update }
                                           _delete={ _delete }
                                           fte = {fte(employee.id)}
                                        //    fte = { fte.map(fte => { if (fte.id === employee.id) return fte.employeeId}) }
                                           employee={ employee } 
                                           contracts = {contracts}
                                           add_contract = { add_contract }
                                           allocations = {allocations}
                                           /> 
                }
            }) 
        }
        </tbody>
    </Table>
</section>

export default EmployeeTable;