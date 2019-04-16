import React from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import ProjectShowDialogue from './ProjectShowDialogue'
import ProjectUpdateDialogue from './ProjectUpdateDialogue'

const ProjectTableElement = ({ update, _delete, project }) => (
    <tr key={ project.id } >
        <td>{ project.name }</td>
        <td>{ project.startDate }</td>
        <td>{ project.endDate }</td>
        <td>{ project.projectManagerId }</td>
        <td>{ project.ftePercentage }</td>
        <td><ProjectShowDialogue project={ project } />
        <ProjectUpdateDialogue update={ update } project={ project } />
        <Button color='danger' onClick={ _.partial(_delete, project.id) } className='float-right' >Delete</Button></td>
    </tr>
)


export default ProjectTableElement;