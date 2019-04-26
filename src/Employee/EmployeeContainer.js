import React, {Component} from "react";
import _ from 'lodash';
import { employeeService } from '../API/EmployeeAPI'
import { contractService } from "../API/ContractAPI";
import { allocationService } from "../API/AllocationAPI";
import EmployeeCreateDialogue from './EmployeeCreateDialogue'
import EmployeeTable from './EmployeeTable'
import {authenticationService} from '../Services/Authentication.service'
import { Route, Redirect } from 'react-router-dom';

class EmployeeContainer extends Component {

  constructor(props){
    super(props)
    this.state = { 
      emps: [],
      contracts: [],
      allocations: []
    }
    this.getFTE = this.getFTE.bind(this)
    this.getContracts = this.getContracts.bind(this)
    this.getAllocations = this.getAllocations.bind(this)
  }

  componentDidMount() {
    employeeService.getAll().then(
      employees => {
        this.setState({emps: employees})
      }
    )

    contractService.getAll().then(
      contracts =>{
        this.setState({contracts: contracts})
      }
    )

    allocationService.getAll().then(
      allocations => {
        this.setState({allocations: allocations})
      }
    )
  }

  getFTE(employeeId){
    let employeeContracts = this.getContracts(employeeId)
    return _.sumBy(employeeContracts, function (c) { return c.pensumPercentage })
  }

  getContracts(employeeId){
    return _.filter(this.state.contracts, function(c) { return c.employeeId === employeeId; })
  }

  getAllocations(contractId){
    return _.filter(this.state.allocations, function(a) { return a.contractId == contractId})
  }

  create = (employee, role, password) => {
    employeeService.create(employee, role, password)
    .then(employee => {
        this.setState({ emps: _.concat(this.state.emps, employee) })
      })
    .catch(error => console.error(error));
  }

  update = (employee) => {
    this.setState({ emps: _.map(this.state.emps, e => e.id === employee.id ? employee : e) })
  }

  _delete = id => {
    this.setState({ emps : _.reject(this.state.emps, { id: id })})
    employeeService.remove(id)
  }

  render() {
    let createDialogue

    if(authenticationService.isAdmin){
      createDialogue = <EmployeeCreateDialogue create = { this.create }/>
    }

    return <div>
      { createDialogue }
      <h3>Employees</h3>
      <EmployeeTable update = { this.update } _delete = { this._delete } fte = { this.getFTE} emps = { this.state.emps } contracts = { this.state.contracts } allocations = { this.state.allocations }/>
    </div>
  }
}
export default EmployeeContainer;