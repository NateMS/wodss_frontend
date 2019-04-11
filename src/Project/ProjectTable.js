import React from 'react'
import { Table } from 'reactstrap'
import ProjectTableElement from './ProjectTableElement'

const ProjectTable = ({ update, _delete, ps }) => <section>
    <Table>
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