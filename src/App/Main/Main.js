import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import { PrivateRoute } from './../../Components/PrivateRoute'
import { LoginPage } from '../../LoginPage/LoginPage';
import ProjectContainer from './../../Project/ProjectContainer';
import EmployeeContainer from './../../Employee/EmployeeContainer';
import './Main.css';
import Me from '../Me/Me';

const Main = () => (
  <main>
    <Container>
        <Row>
            <Col md="12">
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <PrivateRoute path='/projects' component={ProjectContainer}/>
                    <PrivateRoute path='/employees' component={EmployeeContainer}/>
                    <PrivateRoute path='/my-allocations' component={Me}/>
                    <PrivateRoute path='/' component={ProjectContainer}/>
                </Switch>
            </Col>
        </Row>
    </Container>
  </main>
)

export default Main
