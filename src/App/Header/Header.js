import React, {Component} from "react";
import {Link} from "react-router-dom";
import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <Link to="/" className="navbar-brand">Projectarr</Link>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
                <Link to="/projects" className="nav-link">projects</Link>
            </li>
            <li className="nav-item">
                <Link to="/employees" className="nav-link">employees</Link>
            </li>
          </ul>
          <Link to="/logout" className="nav-link">logout</Link>
        </div>
      </nav>
    )
  }
}
export default Header