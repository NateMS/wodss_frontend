import React, { Component } from 'react'
import _ from 'lodash'
import { projectService } from '../API/ProjectAPI'
import { employeeService } from '../API/EmployeeAPI'
import { contractService } from '../API/ContractAPI'
import { allocationService } from '../API/AllocationAPI'
import ProjectTable from './ProjectTable'
import ProjectCreateDialogue from './ProjectCreateDialogue'
import { authenticationService } from '../Services/Authentication.service';


class ProjectContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { ps: [], pms: [], allocations: [] }

    let self = this
    employeeService.getAll('PROJECTMANAGER').then(prmngs => this.setState({ pms: prmngs }));
    allocationService.getAll().then(allocations => {
      this.setState({ allocations: allocations }, () => {
        projectService.getAll()
        .then(projects => {
          projects.map(project => self.addAllocationsToProject(project))
          self.setState({ ps: projects })
        })
      })
    });
  }

  generateIndex = projects =>
    _.get(_.last(projects), 'id', 0) + 1

  create = (project) => {
    project.allocations = []
    this.setState({ ps: _.concat(this.state.ps, project) })
  }

  createAllocation = (allocation) => {
    this.setState({ allocations: _.concat(this.state.allocations, allocation) }, () => {
      let project = this.state.ps.find(project => project.id === allocation.projectId)
      this.addAllocationsToProject(project)
    })
  }

  updateAllocation = (allocation) => {
    this.setState({ allocations: _.map(this.state.allocations, a => a.id === allocation.id ? allocation : a) }, () => {
      let project = this.state.ps.find(project => project.id === allocation.projectId)
      this.addAllocationsToProject(project)
    })
  }

  update = (project) => {
    this.setState({ ps: _.map(this.state.ps, p => p.id === project.id ? project : p) })
  }

  _delete = id => {
    projectService.remove(id)
    this.setState({ ps: _.reject(this.state.ps, { id: id }) })
  }

  deleteAllocation = id => {
    let allocation = this.state.allocations.find(allocation => allocation.id === id)
    let project = this.state.ps.find(project => project.id === allocation.projectId)
    allocationService.remove(id).then(e => {
      this.setState({ allocations: _.reject(this.state.allocations, { id: id }) }, () => {
        project.allocations = _.reject(project.allocations, { id: id })
        this.update(project)
      })
    })
  }

  addAllocationsToProject = (project) => {
    project.allocations = this.state.allocations.filter(allocation => allocation.projectId === project.id);
    if (!project.allocations) project.allocations = [];
    Promise.all(project.allocations.map(allocation => this.addContractToAllocation(allocation))).then(e=>this.update(project))
  }

  addContractToAllocation = (allocation) => {
    return contractService.get(allocation.contractId).then(contract => {
      allocation.contract = contract;
      return this.addEmployeeToAllocation(allocation).then(allocation => allocation);
    });
  }

  addEmployeeToAllocation = (allocation) => {
    return employeeService.get(allocation.contract.employeeId).then(employee => {
      allocation.employee = employee;
      return allocation;
    });
  }

  render() {
    let projectCreateDialogue
    if (authenticationService.isAdmin()) projectCreateDialogue = <ProjectCreateDialogue create={this.create} pms={this.state.pms} />

    return <div>
      {projectCreateDialogue}
      <h3>Projects</h3>
      <ProjectTable update={this.update} _delete={this._delete} deleteAllocation={this.deleteAllocation} updateAllocation={this.updateAllocation} createAllocation={this.createAllocation} ps={this.state.ps} pms={this.state.pms} />
    </div>
  }
}

export default ProjectContainer;