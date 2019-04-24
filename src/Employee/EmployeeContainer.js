import React, {Component} from "react";
import _ from 'lodash';
import { employeeService } from './EmployeeAPI'
import { contractService } from "./Contract/ContractAPI";
import EmployeeCreateDialogue from './EmployeeCreateDialogue'
import EmployeeTable from './EmployeeTable'

class EmployeeContainer extends Component {

  constructor(props){
    super(props)
    this.state = { 
      emps: [],
    }
  }

  componentDidMount() {
    let self = this;
    employeeService.getAll().then(
      employees => {
        console.log(employees)
        this.setState({emps: employees});
      }
    )

    let employees = _.map(this.state.emps , function(e) {
      self.getFTE(e.id).then(fte => {
        console.log(fte)
        self.setState({fte: fte})
      })
      let fte = {fte: self.state.fte}
      _.assign(e, fte)
    })

    console.log(employees)

  }

  getFTE(employeeId){
    return contractService.getAll()
        .then(contracts => {
          let employeeContracts = _.filter(contracts, function(c) { return c.employeeId === employeeId; });
          return _.sumBy(employeeContracts, function (c) { return c.pensumPercentage })
        })
        .catch(error => console.error(error));
  }


  create = (employee) => {
    employeeService.create(employee)
    .then(response =>{
          if(response.ok){
            return response.json()
          }
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





  render() {

    return <div>
      <EmployeeCreateDialogue create = { this.create } />
      <h3>Employees</h3>
      <EmployeeTable update = { this.update } _delete = { this._delete } getFTE = { this.getFTE } emps = { this.state.emps } />
    </div>
  }
}
export default EmployeeContainer;