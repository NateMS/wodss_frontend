import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './../../PrivateRoute'
import AuthContainer from './../../Auth/AuthContainer';
import ProjectContainer from './../../Project/ProjectContainer';
import EmployeeContainer from './../../Employee/EmployeeContainer';

const Main = () => (
  <main>
        <Switch>
            <Route exact path='/' component={AuthContainer}/>
            <PrivateRoute path='/projects' component={ProjectContainer}/>
            <PrivateRoute path='/employees' component={EmployeeContainer}/>
        </Switch>
  </main>
)

export default Main
