import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'

class ProjectUpdateDialog extends Component {

    constructor(props) {
        super(props)
        this.state = { title: this.props.project.title,
                       description: this.props.project.description, 
                       showModal: false }
    }
    
    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
        this.setState({ title: '', description: '', showModal: false })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()
        this.setState({ showModal: false })
        this.props.update({ id: this.props.project.id, 
                            title: this.state.title, 
                            description: this.state.description,  })
    }

    render() {
        return (
          <span>
            <Button color="primary" onClick={this.open} className='float-left' >Edit</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                Edit Project
              </ModalHeader>
              <ModalBody>
                 <Form>
                   <FormGroup row>
                     <Label md={2} for="formTitle">
                       Title
                     </Label>
                     <Col md={10}>
                       <Input type="text" name="title" value={ this.state.title } id="formTitle" onChange={ this.onChange } />
                     </Col>
                   </FormGroup>
    
                   <FormGroup row>
                     <Label md={2} for="formDescription">
                       Description
                     </Label>
                     <Col md={10}>
                       <Input type="text" name="description" value={ this.state.description } id="formDescription" onChange={ this.onChange } />
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
          </span>
        )
      }    
}

export default ProjectUpdateDialog
