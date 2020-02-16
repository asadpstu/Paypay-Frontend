import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavigationBar from './components/commom/header';
import jwt from 'jwt-decode'

import Home from './components/home/home';
import AssignEmployee from './components/assign-employee/assign-employee';

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    try
    {
       console.log(jwt(localStorage.getItem('token')))
       const checkingIsloggedin = jwt(localStorage.getItem('token'));
       this.setState({
         handlecontrol : checkingIsloggedin
       })

    }
    catch
    {
      console.log("Not loogedin");
      this.setState({
        handlecontrol : "NOT-AUTHENTICATED"
      })
    }
  }

  render(){
      
      return (
        <React.Fragment>
          <NavigationBar />

          <main >
              <Route path="/" 
                     exact 
                     render={props => <Home {...props} handlecontrol={this.state.handlecontrol}/> } />  
              <Route path="/assign-user-review" 
                     exact 
                     render={props => <AssignEmployee {...props} handlecontrol={this.state.handlecontrol}/> } />            
          </main>
        </React.Fragment>
      
    );
  }
}

export default App;
