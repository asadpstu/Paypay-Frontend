import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";
import appconfig from "../../config/config";
import swal from "sweetalert";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      isAdmin: false
    };
    this.login = this.login.bind(this);
    this.capture = this.capture.bind(this);
    this.logout = this.logout.bind(this);
  }

  capture(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async login(e) {
    e.preventDefault();
    const loginObject = {
      email: this.state.email,
      password: this.state.password
    };

    try {
      const response = await axios.post(
        appconfig.apibaseurl + "/authenticate",
        loginObject
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data["x-access-token"]);
        window.location.reload();
      }
    } catch {
      //not authorized to login
      swal({
        title: "Failed",
        text: "Please provide valid email and password",
        icon: "warning",
        button: "ok"
      });
    }
  }

  
  componentDidMount() {
    try {
      const data = jwt(localStorage.getItem("token"));
      this.setState({
        response: "authenticated",
        username: data.loggedInUser.name,
        isAdmin: data.loggedInUser.isAdmin
      });
    } catch (e) {
    }
  }

  logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  setActive = (value) =>{
    this.setState({
      activeMenu : value
    });
  }


  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-white ">
        <Link className="navbar-brand headercolor" to="/">
          <strong>PayPay</strong>
          <span className="headerDesc"> Corporation</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ">
          <li className="nav-item leftmargin">
            <Link onClick={()=>this.setActive('review')}  
            className={ this.state.activeMenu === 'review' ? 'nav-link NormalNavLink active' : 'nav-link NormalNavLink'}
            to="/">
             Performance Review & Feedback
            </Link>
          </li>
            {this.state.isAdmin && (
              <React.Fragment>
                <li className="nav-item ">
                  <Link
                     onClick={()=>this.setActive('employeemanagement')}
                     className={ this.state.activeMenu === 'employeemanagement' ? 'nav-link NormalNavLink active' : 'nav-link NormalNavLink'}
                    to="/assign-user-review"
                  >
                    Employee Management
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {!this.state.response && (
                <React.Fragment>
                  <form className="form-inline">
                    <div className="form-group mx-sm-2 mb-2">
                      <label className="sr-only">Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control-xs"
                        placeholder="Email"
                        onChange={this.capture}
                      />
                    </div>
                    <div className="form-group mx-sm-2 mb-2">
                      <label className="sr-only">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control-xs"
                        placeholder="Password"
                        onChange={this.capture}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mb-2  btn-sm"
                      onClick={this.login}
                    >
                      Login
                    </button>
                  </form>
                </React.Fragment>
              )}
              {this.state.response && (
                <React.Fragment>
                  <span className="pdr5 NormalNavLink">
                    Greetings, {this.state.username}!!{" "}
                  </span>
                  <span
                    className="pdr5 NormalNavLink logout"
                    onClick={this.logout}
                  >
                    {" "}
                    (Logout){" "}
                  </span>
                </React.Fragment>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
