import React, {Component} from "react";
import './Header.css';

import { authenticationService} from './../../Services/Authentication.service'
import { history } from './../../Helpers/History'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  logout() {
      authenticationService.logout();
      history.push('/login');
  }
  render() {
    return (
      <div>
        <Navbar light>
          <NavbarBrand href="/" className="mr-auto">projectarr</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/projects/">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/employees/">Employees</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/logout/" onClick={this.logout}>logout</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
export default Header