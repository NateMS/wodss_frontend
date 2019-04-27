import React, {Component} from 'react'
import { Button } from 'reactstrap'
import { dateToReadable } from '../Helpers/DateHelper'
import AllocationUpdateDialogue from './AllocationUpdateDialogue'
import {authenticationService} from '../Services/Authentication.service'

class AllocationTableElement extends Component {
    constructor(props){
        super(props)
    }

    render() {
        
    let editable
    if (authenticationService.isAdmin()) {
        editable =                 <td>
        <AllocationUpdateDialogue allocation={this.props.allocation} update={this.props.update}/>
    </td>
    }

    return  <tr key={this.props.allocation.id}>
                <td>{dateToReadable(this.props.allocation.startDate)}</td>
                <td>{dateToReadable(this.props.allocation.endDate)}</td>
                <td>{this.props.allocation.pensumPercentage}</td>
                {editable}
            </tr>
    }
}

export default AllocationTableElement;
