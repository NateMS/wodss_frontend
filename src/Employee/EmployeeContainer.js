import React, {Component} from "react";
import _ from 'lodash';
import {employeeService} from './EmployeeAPI'
import EmployeeCreateDialogue from './EmployeeCreateDialogue'
import EmployeeTable from './EmployeeTable'
import EmployeeTableElement from './EmployeeTableElement'
import { projectService } from "../Project/ProjectAPI";


class EmployeeContainer extends Component {

  constructor(props){
    super(props)
    this.state = { emps: [] }
  }

  create = (employee) => {
    projectService.create(employee)
    .then(response =>{
          if(response.ok){
            return response.json()
          }
          console.log(response);
          throw new Error('Network response was not ok.');
        }
      )
    .then(employee => {
        this.setState({ emps: _.concat(this.state.emps, employee) })
      })
    .catch(error => console.error(error));
  }

  update = (employee) => {

  }

  _delete = id => {

  }

  componentDidMount() {
    employeeService.getAll()
      .then(response => response)
      .then(employees => this.setState({ emps: employees }))
      .catch(error => console.error(error));
    }

  render() {
    return <div>
      <EmployeeCreateDialogue create = { this.create } />
      <h3>Employees</h3>
      <EmployeeTable update = { this.update } _delete = { this._delete } emps = { this.state.emps } />
    </div>
  }
}
export default EmployeeContainer;