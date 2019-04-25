import React, { Component } from 'react'
import _ from 'lodash'
import {projectService} from '../API/ProjectAPI'
import {employeeService} from '../API/EmployeeAPI'
import ProjectTable from './ProjectTable'
import ProjectCreateDialogue from './ProjectCreateDialogue'


class ProjectContainer extends Component {

    constructor(props) {
        super(props)
        this.state = { ps: [], pms: []}
        employeeService.getAll('PROJECTMANAGER').then(prmngs => this.setState({pms: prmngs.filter(pm => pm.active)}));
    }

    generateIndex = projects => 
    _.get(_.last(projects), 'id', 0) + 1

    create = (project) => {
      this.setState({ ps: _.concat(this.state.ps, project)})
    }

    update = (project) => {
      this.setState({ ps: _.map(this.state.ps, p => p.id === project.id ? project : p) })
    }

    _delete = id => {
      projectService.remove(id)
      this.setState({ ps : _.reject(this.state.ps, { id: id })})
    }

    componentDidMount() {
      projectService.getAll()
        .then(projects => this.setState({ ps: projects }))
    }

    render() {
      return <div>
        <ProjectCreateDialogue create={ this.create } pms={this.state.pms} projects={this.state.ps} />
        <h3>Projects</h3>
        <ProjectTable update={ this.update } _delete={ this._delete} ps={ this.state.ps } />
      </div>
    }
}

export default ProjectContainer;