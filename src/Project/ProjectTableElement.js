import React from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import ProjectShowDialogue from './ProjectShowDialogue'
import ProjectUpdateDialogue from './ProjectUpdateDialogue'

const ProjectTableElement = ({ update, _delete, project }) => (
    <tr key={ project.id } >
        <td>{ project.id }</td>
        <td>{ project.title }</td>
        <td>{ project.description }</td>
        <td><ProjectShowDialogue project={ project } /></td>
        <td><ProjectUpdateDialogue update={ update } project={ project } /></td>
        <td><Button color='danger' onClick={ _.partial(_delete, project.id) } className='float-right' >Delete</Button></td>
    </tr>
)


export default ProjectTableElement;