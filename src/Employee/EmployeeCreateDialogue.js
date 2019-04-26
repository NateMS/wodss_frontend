import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input, ButtonGroup } from 'reactstrap'

class EmployeeCreateDialogue extends Component {

    constructor(props) {
        super(props)
        this.state = { 
          firstName: '', 
          lastName: '',
          email: '',
          active: false,
          password: '',
          rSelected: 1,
          howModal: false, 
          dropdownOpen: false
        }
    }
    
    onRadioBtnClick = (rSelected) =>{
      this.setState({ rSelected });
    }

    onCheckboxChange = event =>{
      this.setState({active: !this.state.active});
    }

    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
      this.setState({ 
        firstName: '', 
        lastName: '',
        email: '',
        active: false,
        role: '',    
        showModal: false 
      })    
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()

        let role = ''

        switch(this.state.rSelected){
          case 1:
            role = 'DEVELOPER'
            break;
          case 2:
            role = 'PROJECTMANAGER'
            break;
          case 3:
            role = 'ADMINISTRATOR'
            break;
          default:
            role = 'DEVELOPER'
        }

        let employee = ({
          active: this.state.active, 
          firstName: this.state.firstName, 
          lastName: this.state.lastName, 
          emailAddress: this.state.email,
        })

        this.props.create(employee, role, this.state.password)
        
        this.setState({ 
          firstname: '', 
          lastName: '',
          email: '',
          active: false,
          role: '',    
          showModal: false 
        })
    }

    render() {
        return (
          <div>
            <Button color="success" onClick={this.open} className='float-right btn-list-btn'>Add Employee</Button>
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
                     <Input type="email" name="email" id="formEmail" value={ this.state.email } onChange={ this.onChange } placeholder="name@domain.com" />
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="formPassword">
                       Password
                     </Label>
                     <Col md={10}>
                     <Input type="password" name="password" id="formPassword" value={ this.state.password } onChange={ this.onChange } placeholder="password" />
                     </Col>
                   </FormGroup>

                   <FormGroup row>
                     <Label md={2} for="formEmail">
                       Role
                     </Label>
                     <Col md={10}>
                     <ButtonGroup>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Developer</Button>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Project Manager</Button>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Administrator</Button>
                      </ButtonGroup>
                    </Col>
                   </FormGroup>
                    
                   <FormGroup>
                     <Col className="clearfix" style={{ padding: '.2rem' }}>
                       <Button className="float-right" color="success" onClick={this.onSubmit}>Save</Button>
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
