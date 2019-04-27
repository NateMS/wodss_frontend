import React from 'react'
import { Table } from 'reactstrap'
import ProjectTableElement from './ProjectTableElement'

const ProjectTable = ({ update, _delete, ps, pms}) => <section>
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
                {
                return <ProjectTableElement key={ project.id } 
                                           update={ update }
                                           _delete={ _delete }
                                           project={ project } 
                                           pms={ pms }/> 
        })}
        </tbody>
    </Table>
</section>


export default ProjectTable;