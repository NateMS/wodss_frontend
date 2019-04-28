import React, { Component } from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import ProjectShowDialogue from './ProjectShowDialogue'
import ProjectUpdateDialogue from './ProjectUpdateDialogue'
import { dateToReadable } from '../Helpers/DateHelper'
import { authenticationService } from '../Services/Authentication.service'

class ProjectTableElement extends Component {
    render() {
        let projectUpdate, projectDelete
        let UpdateBtn = <ProjectUpdateDialogue update={this.props.update} project={this.props.project} pms={this.props.pms} updateAllocation={this.props.updateAllocation} deleteAllocation={this.props.deleteAllocation} createAllocation={this.props.createAllocation} />

        if (authenticationService.isAdmin()) {
            projectDelete = <Button color='danger' onClick={_.partial(this.props._delete, this.props.project.id)} className='float-left btn-list-btn' >Delete</Button>
            projectUpdate = UpdateBtn
        }

        if (authenticationService.isPM && authenticationService.currentUserValue().decoded.id === this.props.project.projectManagerId) {
            projectUpdate = UpdateBtn
        }

        return (
            <tr key={this.props.project.id} >
                <td>{this.props.project.name}</td>
                <td>{dateToReadable(this.props.project.startDate)}</td>
                <td>{dateToReadable(this.props.project.endDate)}</td>
                <td>{this.props.project.pm.firstName + " " + this.props.project.pm.lastName}</td>
                <td>{this.props.project.ftePercentage}</td>
                <td><ProjectShowDialogue project={this.props.project} />
                    {projectUpdate}
                    {projectDelete}</td>
            </tr>
        )
    }
}


export default ProjectTableElement;