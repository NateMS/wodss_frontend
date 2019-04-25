import React from 'react'
import { Table } from 'reactstrap'
import ProjectTableElement from './ProjectTableElement'

const ProjectTable = ({ update, _delete, ps }) => <section>
    <Table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Start-Date</th>
                <th>End-Date</th>
                <th>Project-Manager</th>
                <th>FTE</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        { 
            ps.map(project => 
                <ProjectTableElement key={ project.id } 
                                           update={ update }
                                           _delete={ _delete }
                                           project={ project } />) 
        }
        </tbody>
    </Table>
</section>


export default ProjectTable;