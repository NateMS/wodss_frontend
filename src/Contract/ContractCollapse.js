import React, { Component } from 'react'
import { Button, Collapse, Card, CardBody } from 'reactstrap'

class ContractCollapse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    toggle = () => {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {

        return <div key={this.props.contract.id}>
        <Button name="colllapseBtn" color="primary" onClick={this.toggle}>Toggle</Button>
        <Collapse isOpen={this.state.collapse} >
                    <Card>
                        <CardBody>
                            {JSON.stringify(this.props.contract)}
                        </CardBody>
                    </Card>
                </Collapse>
    </div>
    }
}

export default ContractCollapse