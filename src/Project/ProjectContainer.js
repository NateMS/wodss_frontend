import React, { Component } from 'react'
import _ from 'lodash'
import {projectService} from '../API/ProjectAPI'
import ProjectTable from './ProjectTable'
import ProjectCreateDialogue from './ProjectCreateDialogue'


class ProjectContainer extends Component {

    constructor(props) {
        super(props)
        this.state = { ps: [] }
    }

    generateIndex = projects => 
    _.get(_.last(projects), 'id', 0) + 1

    create = (title, description) => {
        projectService.create({title, description})
        .then(projects => this.setState({ ps: _.concat(this.state.ps, projects) }))
        .catch(error => console.error(error))
    }

    update = project => {
      projectService.update(project)
          .then(project => this.setState({ ps: _.map(this.state.ps, p => p.id === project.id ? project : p) }))
          .catch(error => console.error(error))
    }

    _delete = id => {
      projectService.remove(id)
    }

    componentDidMount() {
      projectService.getAll()
        .then(projects => this.setState({ ps: projects }))
    }

    render() {
      return <div>
        <ProjectCreateDialogue create={ this.create } />
        <h3>Projects</h3>
        <ProjectTable update={ this.update } _delete={ this._delete} ps={ this.state.ps } />
      </div>
    }
}

export default ProjectContainer;