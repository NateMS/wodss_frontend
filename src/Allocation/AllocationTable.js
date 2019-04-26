import React from 'react'
import { Table } from 'reactstrap'
import AllocationTableElement from './AllocationTableElement'

const AllocationTable = ({ allocations, employeeId, contractId }) => <section>
    <Table>
        <thead>
            <tr>
                <th>Start</th>
                <th>End</th>
                <th>Pensum</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        { 
            allocations.map(allocation =>{
                return <AllocationTableElement key={allocation.id}
                            allocation={allocation}
                            employeeId={employeeId}
                            contractId={contractId}
                            />
                            
            })
        }
        </tbody>
    </Table>
</section>

export default AllocationTable;