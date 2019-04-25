import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Row, Input } from 'reactstrap'

class ProjectShowDialog extends Component {

    constructor(props) {
        super(props)
        this.state = { showModal: false }
    }
    
    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
        this.setState({ showModal: false })
    }

    render() {
      console.log(this.props.project)
        return (
          <div>
            <Button color="secondary" onClick={this.open} className='float-right'>Show</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                {this.props.project.name}
              </ModalHeader>
              <ModalBody>
                 <Form>
                   <Row form>
                    <Col md={6}>
                      <FormGroup row>
                      <Label md={2} for="startDate">
                        From
                      </Label>
                      <Col md={10}>
                        <Input plaintext value={this.props.project.startDate} />
                      </Col>
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup row>
                      <Label md={2} for="endDate">
                        To
                      </Label>
                      <Col md={10}>
                        <Input plaintext value={this.props.project.endDate} />
                      </Col>
                    </FormGroup>
                    </Col>
                   </Row>
                   <Row>
                     <Col md={6}>
                      <FormGroup row>
                        <Label md={2} for="projectManager">
                          Projectmanager
                        </Label>
                        <Col md={10}>
                          <Input plaintext value={this.props.project.projectManagerId} />
                        </Col>
                      </FormGroup>
                     </Col>
                   </Row>
                   <FormGroup row>
                     <Label md={2} for="formName">
                       Name
                     </Label>
                     <Col md={10}>
                      <Input plaintext value={this.props.project.name} />
                     </Col>
                   </FormGroup>
                   <FormGroup row>
                     <Label md={2} for="formDescription">
                       Description
                     </Label>
                     <Col md={10}>
                      <Input plaintext value={this.props.project.name} />
                     </Col>
                   </FormGroup>
                   <FormGroup>
                     <Col className="clearfix" style={{ padding: '.2rem' }}>
                       <Button className="float-right" color="secondary" 
                        onClick={this.close}>Close</Button>
                     </Col>
                   </FormGroup>
                 </Form>
              </ModalBody>
            </Modal>
          </div>
        )
      }    
}

export default ProjectShowDialog