import React, { Component } from 'react'
import { contractService } from '../../API/ContractAPI';
import { authenticationService } from '../../Services/Authentication.service';
import ContractCollapse from '../../Contract/ContractCollapse';

class Me extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentUser: '',
            contracts: []
        }
    }
    
    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }, () => {
            contractService.getAll().then(contracts => {
                contracts = contracts.filter(contract => contract.employeeId === this.state.currentUser.decoded.id)
                this.setState({ contracts: contracts })
            })
        }))
    }

    render() {
        return (
            <div>
                <h1>My Allocations</h1>
                { (this.state.contracts.length > 0 && 
                    this.state.contracts.map(contract => {
                        return <ContractCollapse key={contract.id} contract={contract} editable={false} />
                    })
                )|| <h4>You don't have any Contracts</h4>
                }

            </div>
        )
    }
}

export default Me
