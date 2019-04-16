import React, { Component } from 'react'
import _ from 'lodash'
import {projectService} from './ProjectAPI'
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
        .then(response => {
          if(response.ok) {
            return response.json()
          }
          throw new Error('Network response was not ok.');
        })
        .then(projects => this.setState({ ps: _.concat(this.state.ps, projects) }))
        .catch(error => console.error(error))
    }

    update = project => {
      projectService.update(project)
          .then(response => {
              if (response.ok) {
                  console.log('ok');
              } else {
                  throw new Error('Network response was not ok.');
              }
          })
          .then(project => this.setState({ ps: _.map(this.state.ps, p => p.id === project.id ? project : p) }))
          .catch(error => console.error(error))
    }

    _delete = id => {
      projectService.remove(id)
          .then(response => {
              if (response.ok) {
                  this.setState({ ps: _.reject(this.state.ps, { id: id }) })
                console.log('ok');
              } else {
                  throw new Error('Network response was not ok.');
              }
          })
          .catch(error => console.error(error))
    }

    componentDidMount() {
      projectService.getAll()
        .then(response => response)
        .then(projects => this.setState({ ps: projects }))
        .catch(error => console.error(error))
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