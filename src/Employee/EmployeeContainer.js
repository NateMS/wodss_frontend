import React, {Component} from "react";
import _ from 'lodash';
import { employeeService } from '../API/EmployeeAPI'
import { contractService } from "../API/ContractAPI";
import { allocationService } from "../API/AllocationAPI";
import EmployeeCreateDialogue from './EmployeeCreateDialogue'
import EmployeeTable from './EmployeeTable'

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
    console.log(employee)
    employeeService.create(employee, role, password)
    .then(employee => {
        this.setState({ emps: _.concat(this.state.emps, employee) })
      })
    .catch(error => console.error(error));
  }

  update = (employee) => {
    employeeService.update(employee)
    .then(employee => {
        this.setState({ emps: _.concat(this.state.emps, employee) })
      })
    .catch(error => console.error(error));
  }

  _delete = id => {
    employeeService.remove(id)
  }





  render() {
    return <div>
      <EmployeeCreateDialogue create = { this.create } />
      <h3>Employees</h3>
      <EmployeeTable update = { this.update } _delete = { this._delete } fte = { this.getFTE} emps = { this.state.emps } />
    </div>
  }
}
export default EmployeeContainer;