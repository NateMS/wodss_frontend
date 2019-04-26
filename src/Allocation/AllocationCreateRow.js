import React, { Component } from 'react'
import DatePicker from 'react-date-picker'
import { Button, Input } from 'reactstrap'
import { dateToTimestamp } from '../Helpers/DateHelper'
import {allocationService} from '../API/AllocationAPI'

class AllocationCreateRow extends Component {
    constructor(props) {
        super(props) // contractid
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            pensumPercentage: '',
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()

        let allocation = {

        }


    }

    render() {
        return <tr>
            <td>
                <DatePicker name="startDate" value={this.state.startDate} onChange={e => this.onChange({ target: { name: 'startDate', value: e } })} />
            </td>
            <td>
                <DatePicker name="startDate" value={this.state.endDate} onChange={e => this.onChange({ target: { name: 'startDate', value: e } })} />
            </td>
            <td>
                <Input
                    type="number"
                    name="pensumPercentage"
                    id="pensum"
                    value={this.state.pensumPercentage}
                    onChange={this.onChange}
                />
            </td>
            <td>
                <Button className="float-right" color="success" onClick={this.onSubmit}>Save</Button>
            </td>
        </tr>
    }
}

export default AllocationCreateRow;