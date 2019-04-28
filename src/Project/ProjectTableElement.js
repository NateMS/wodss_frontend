import React, { Component } from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import ProjectShowDialogue from './ProjectShowDialogue'
import ProjectUpdateDialogue from './ProjectUpdateDialogue'
import { dateToReadable } from '../Helpers/DateHelper'
import { authenticationService } from '../Services/Authentication.service'

class ProjectTableElement extends Component {
    render() {
        let project = this.props.project
        let projectUpdate, projectDelete = '';
        let UpdateBtn = <ProjectUpdateDialogue update={this.props.update} project={project} pms={this.props.pms} createAllocation={this.props.createAllocation} />

        if (authenticationService.isAdmin) {
            projectDelete = <Button color='danger' onClick={_.partial(this.props._delete, project.id)} className='float-left btn-list-btn' >Delete</Button>
            projectUpdate = UpdateBtn
        }

        if (authenticationService.isPM && authenticationService.currentUser.id === project.projectManagerId) {
            projectUpdate = UpdateBtn
        }

        return (
            <tr key={project.id} >
                <td>{project.name}</td>
                <td>{dateToReadable(project.startDate)}</td>
                <td>{dateToReadable(project.endDate)}</td>
                <td>{project.pm.firstName + " " + project.pm.lastName}</td>
                <td>{project.usedFTE} / {project.ftePercentage}</td>
                <td><ProjectShowDialogue project={project} />
                    {projectUpdate}
                    {projectDelete}</td>
            </tr>
        )
    }
}


export default ProjectTableElement;