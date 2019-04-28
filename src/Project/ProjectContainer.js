import React, { Component } from 'react'
import _ from 'lodash'
import { projectService } from '../API/ProjectAPI'
import { employeeService } from '../API/EmployeeAPI'
import { contractService } from '../API/ContractAPI'
import { allocationService } from '../API/AllocationAPI'
import ProjectTable from './ProjectTable'
import ProjectCreateDialogue from './ProjectCreateDialogue'


class ProjectContainer extends Component {

  constructor(props) {
    super(props)
    this.state = { ps: [], pms: [], allocations: [] }

    let self = this
    employeeService.getAll('PROJECTMANAGER').then(prmngs => this.setState({ pms: prmngs }));
    allocationService.getAll().then(allocations => {
      this.setState({ allocations: allocations })
      projectService.getAll()
      .then(projects => {
        projects = projects.map(project => {
          return self.addAllocationsToProject(project)
        })
        self.setState({ ps: projects })
      })
    });

  }

  generateIndex = projects =>
    _.get(_.last(projects), 'id', 0) + 1

  create = (project) => {
    this.setState({ ps: _.concat(this.state.ps, project) })
  }

  createAllocation = (allocation) => {
    this.setState({allocations: _.concat(this.state.allocations, allocation)})
  }

  update = (project) => {
    this.setState({ ps: _.map(this.state.ps, p => p.id === project.id ? project : p) })
  }

  _delete = id => {
    projectService.remove(id)
    this.setState({ ps: _.reject(this.state.ps, { id: id }) })
  }

  addAllocationsToProject = (project) => {
    console.log(this.state.allocations)
    project.allocations = this.state.allocations.filter(allocation => allocation.projectId === project.id);
    if (!project.allocations) project.allocations = [];
    project.usedFTE = 0
    project.allocations = project.allocations.map(allocation => {
      this.addContractToAllocation(allocation)
      project.usedFTE += allocation.pensumPercentage
      return allocation
    });
    return project;
  }

  addContractToAllocation = async (allocation) => {
    const contract = await contractService.get(allocation.contractId);
    allocation.contract = contract;
    allocation = this.addEmployeeToAllocation(allocation);
    return allocation;
  }

  addEmployeeToAllocation = async (allocation) => {
    const employee = await employeeService.get(allocation.contract.employeeId);
    allocation.employee = employee;
    return allocation;
  }

  render() {
    return <div>
      <ProjectCreateDialogue create={this.create} pms={this.state.pms} projects={this.state.ps} />
      <h3>Projects</h3>
      <ProjectTable update={this.update} _delete={this._delete} createAllocation={this.createAllocation} ps={this.state.ps} pms={this.state.pms} />
    </div>
  }
}

export default ProjectContainer;