import React from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import ProjectShowDialogue from './ProjectShowDialogue'
import ProjectUpdateDialogue from './ProjectUpdateDialogue'
import { dateToReadable, dateToTimestamp } from '../Helpers/DateHelper'

const ProjectTableElement = ({ update, _delete, project }) => (
    <tr key={ project.id } >
        <td>{ project.name }</td>
        <td>{ dateToReadable(project.startDate) }</td>
        <td>{ dateToReadable(project.endDate) }</td>
        <td>{ project.pm.firstName + " " + project.pm.lastName }</td>
        <td>{ project.ftePercentage }</td>
        <td><ProjectShowDialogue project={ project } />
        <ProjectUpdateDialogue update={ update } project={ project } />
        <span><Button color='danger' onClick={ _.partial(_delete, project.id) } className='float-left btn-list-btn' >Delete</Button></span></td>
    </tr>
)


export default ProjectTableElement;