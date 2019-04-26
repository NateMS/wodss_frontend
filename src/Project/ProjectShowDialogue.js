import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Col, Row } from 'reactstrap'
import { dateToReadable, dateToTimestamp } from '../Helpers/DateHelper'

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
          <span>
            <Button color="secondary" onClick={this.open} className='float-left'>Show</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                {this.props.project.name}
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    {this.props.project.description}
                    </Col>
                  <Col md={12}>
                    <p>
                      From {dateToReadable(this.props.project.startDate)} to {dateToReadable(this.props.project.endDate)}
                    </p>
                  </Col>
                  <Col md={12}>
                    <p>
                      Projectmanager: {this.props.project.pm.firstName + " " + this.props.project.pm.lastName}
                    </p>
                  </Col>
                  <Col md={12}>
                    <p>
                      FTE: {this.props.project.ftePercentage}
                    </p>
                  </Col>
                  <Col className="clearfix" style={{ padding: '.2rem' }}>
                    <Button className="float-right" color="secondary" 
                    onClick={this.close}>Close</Button>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </span>
        )
      }    
}

export default ProjectShowDialog