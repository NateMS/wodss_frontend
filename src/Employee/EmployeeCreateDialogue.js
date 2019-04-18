import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'

class EmployeeCreateDialogue extends Component {

    constructor(props) {
        super(props)
        this.state = { title: '', description: '', showModal: false }
    }
    
    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
        this.setState({ title: '', description: '', showModal: false })
    }

    onChange = event => {
        // [event.target.name]: Computed property names, siehe https://mzl.la/1GIMi82
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()
        this.props.create(this.state.title, this.state.description)
        this.setState({ title: '', description: '', showModal: false })
    }

    render() {
        return (
          <div>
            <Button color="success" onClick={this.open} className='float-right'>Add Employee</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                Create Employee
              </ModalHeader>
              <ModalBody>
                 <Form>
                   <FormGroup row>
                     <Label md={2} for="formFirstName">
                       First Name
                     </Label>
                     <Col md={10}>
                       <Input type="text" name="firstName" value={ this.state.firstName } id="formFirstName" onChange={ this.onChange } />
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="formLastName">
                       Last Name
                     </Label>
                     <Col md={10}>
                       <Input type="text" name="lastName" value={ this.state.lastName } id="formLastName" onChange={ this.onChange } />
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="formEmail">
                       E-Mail
                     </Label>
                     <Col md={10}>
                       <Input type="text" name="email" value={ this.state.email } id="formEmail" onChange={ this.onChange } />
                     </Col>
                   </FormGroup>

                    <FormGroup row>
                        <Label md={2} for="formActive">
                        Active
                        </Label>
                        <Col md={10}>
                        <Input type="checkbox" checked name="active" value={ this.state.active } id="formActive" onChange={ this.onChange } />
                        </Col>
                    </FormGroup>

                   <FormGroup>
                     <Col className="clearfix" style={{ padding: '.2rem' }}>
                       <Button className="float-right" color="secondary" onClick={this.onSubmit}>Save</Button>
                     </Col>
                   </FormGroup>
                 </Form>
              </ModalBody>
            </Modal>
          </div>
        )
      }    
}

export default EmployeeCreateDialogue
