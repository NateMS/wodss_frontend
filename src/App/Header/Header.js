import React, { Component } from "react";
import './Header.css';

import { authenticationService } from './../../Services/Authentication.service'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { zip } from "rxjs";

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      name: ''
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }, () => {
      if (x.decoded) {
        this.setState({name: x.decoded.firstName + " " + x.decoded.lastName})
      }
    }));
    
  }

  logout(e) {
    e.preventDefault();
    authenticationService.logout();
  }

  render() {
    let employeeLink = '';
    if (authenticationService.isPM()) {
      employeeLink =  
      <NavItem>
        <NavLink href="/employees/">Employees</NavLink>
      </NavItem>
    }
    return (
      <div>
        <Navbar dark color="dark" expand="md">
          <NavbarBrand href="/">projectarr</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar className="mr-auto">
              <NavItem>
                <NavLink href="/projects/">Projects</NavLink>
              </NavItem>
              {employeeLink}
              <NavItem>
                <NavLink href="/my-allocations/">My Allocations</NavLink>
              </NavItem>
            </Nav>
            <Nav navbar>
              <NavItem>
                <NavLink href="/logout" onClick={this.logout}>{this.state.name} (logout)</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
export default Header