import React, {Component} from 'react'
import { Button } from 'reactstrap'
import { dateToReadable } from '../Helpers/DateHelper'
import AllocationUpdateDialogue from './AllocationUpdateDialogue'

class AllocationTableElement extends Component {
    constructor(props){
        super(props)
    }

    render() {
        
    return  <tr key={this.props.allocation.id}>
                <td>{dateToReadable(this.props.allocation.startDate)}</td>
                <td>{dateToReadable(this.props.allocation.endDate)}</td>
                <td>{this.props.allocation.pensumPercentage}</td>
                <td>
                    <AllocationUpdateDialogue allocation={this.props.allocation} update={this.props.update}/>
                </td>
            </tr>
    }
}

export default AllocationTableElement;
