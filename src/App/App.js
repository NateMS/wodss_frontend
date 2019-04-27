import React, { Component } from 'react';
import './App.css';
import { authenticationService } from '../Services/Authentication.service'
import { history } from '../Helpers/History';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: null
    };
}

componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
}

logout() {
    authenticationService.logout();
    history.push('/login');
}
  render() {
    let header
    if(this.state.currentUser) header = <Header />
    return (
      <div className="App">
      <ToastContainer />
        { header }
        <Main />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
