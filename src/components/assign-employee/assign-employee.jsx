import React, { Component } from "react";
//for http
import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";

//For alert message
import swal from "sweetalert";

//Imporing module
import CreateEmployee from "./create-employee";
import LeftSidebar from "./left-side-bar";
import NotAuthenticated from "../commom/not-authenticated";

class AssignEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: []
    };
    this.save = this.save.bind(this);
    this.addReviewer = this.addReviewer.bind(this);
    this.check = this.check.bind(this);
  }

  async getData() {
    const response = await axios.get(
      appconfig.apibaseurl + "/employee",
      axiosConfig
    );
    try {
      if (response.status === 200) {
        this.setState({
          employeeList: response.data.records
        });
      }
    } catch (e) {
      //Error
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.IdReceived !== this.props.IdReceived) {
      this.setState({
        receivedId: this.props.IdReceived
      });
      this.getuserinformation(this.props.IdReceived);
    }
  }

  check(e) {
    if (e.target.checked === true) {
      this.setState({
        toReview: e.target.value
      });
    } else {
      this.setState({
        toReview: null
      });

      this.refs.form.reset();
      Object.keys(this.state).map(key => {
        if (key.includes("reviewer_")) {
          this.setState({ [key]: null });
        }

        return 0;
      });
    }
  }

  addReviewer(e) {
    if (e.target.checked === true) {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      this.setState({
        [e.target.name]: null
      });
    }
  }

  async save(e) {
    e.preventDefault();
    var reviewer = [];

    Object.keys(this.state).map((key, value) => {
      if (key.includes("reviewer_") && this.state[key]) {
        //second validation for duplicate check
        if (!key.includes(this.state.toReview)) {
          reviewer.push(key.replace("reviewer_", ""));
        }
      }
      return 0;
    });

    var postobject = {};
    postobject.employee_id = this.state.toReview;
    postobject.reviewer_ids = reviewer;

    //Checking data is valid or not
    if (!this.state.toReview) {
      swal({
        title: "Error!",
        text:
          "Can't assign. Please select from {To Review} and {Reviewer} section.",
        icon: "error",
        button: "ok"
      });

      return;
    }

    if (reviewer.length < 1) {
      swal({
        title: "Error!",
        text: "Can't assign. Minimum 1(one) reviewer required",
        icon: "error",
        button: "ok"
      });

      return;
    }

    //If both condition pass then executed to save records

    const response = await axios.post(
      appconfig.apibaseurl + "/assign-performance-review/save",
      postobject,
      axiosConfig
    );
    if (response) {
      swal({
        title: "Successfull",
        text: "Performance review assigned.",
        icon: "success",
        button: "ok"
      });
      const getUpdatedList = await axios.get(appconfig.apibaseurl + "/assign-performance-review/get-all", axiosConfig);
      this.setState({
        content: getUpdatedList.data.records
      });
    }
  }

  liftState = state => {
    this.setState(state);
  };
  SendIdState = state => {
    this.setState(state);
  };

  callbackFunction = () => {
    this.getData();
  }

  render() {
    const { handlecontrol } = this.props;
    const {content,IdReceived,toReview,employeeList,message} = this.state;
    return (

      <div className="container-fluid">
        {handlecontrol !== "NOT-AUTHENTICATED" &&
          <div className="row content">
            <div className="col-sm-2 sidenav">
              <div className="left-background">
                
                <LeftSidebar content={content} SendIdState={this.SendIdState} />
              </div>

            </div>
            <div className="col-sm-10">
              <div className="right-background">
                <div className="row content">
                  <div className="col-sm-6 sidenav">
                    <div className="">
                      <div className="assignEmployee">Employee Management</div>
                      <CreateEmployee parentCallback={this.callbackFunction} liftState={this.liftState} IdReceived={IdReceived} />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="row content">
                      <div className="col-sm-6 sidenav">
                        <div className="">
                          <div className="assignEmployee">To Review [x]</div>
                          <div>
                            {employeeList &&
                              employeeList.map(single => (
                                <div key={single._id}>
                                  <label
                                    key={single._id}
                                    className={
                                      single._id === toReview
                                        ? "activeIt"
                                        : "deactiveIt"
                                    }
                                  >
                                    <input
                                      checked={
                                        single._id === toReview
                                          ? true
                                          : false
                                      }
                                      onChange={this.check}
                                      type="checkbox"
                                      name={single._id}
                                      value={single._id}
                                    />
                                    <small>&nbsp;{single.name}</small>
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6 sidenav">
                        <div className="">
                          <div className="toWhom">Reviewer [q,r,s,t,u....z]</div>
                          <div>
                            <form ref="form">
                              {employeeList &&
                                employeeList.map(single => (
                                  <div key={single._id}>
                                    <label
                                      key={single._id}
                                      className={
                                        single._id === toReview
                                          ? "activeIt"
                                          : "deactiveIt"
                                      }
                                    >
                                      <input
                                        disabled={
                                          single._id === toReview
                                            ? true
                                            : false
                                        }
                                        onChange={this.addReviewer}
                                        type="checkbox"
                                        name={`reviewer_${single._id}`}
                                        value={single._id}
                                      />
                                      <small>&nbsp;{single.name}</small>
                                    </label>
                                  </div>
                                ))}
                            </form>
                            <div className="form-group">
                              <button
                                type="submit"
                                className="form-control-sm btn btn-info btn-sm"
                                onClick={this.save}
                              >
                                Assign employees
                        </button>
                              <p> {message} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                    
                    </div>
                    <div className="row content">
                      <div className="col-sm-12" >
                        <small><strong>Rule :</strong></small> <br></br>

                        <div className="note">1. [ x ]'s Employee Performance can be reviewed by no. of Reviewer. [q,r,s,t,u....z]</div>
                        <div className="note">2. [ x ]'s Employee Performance can be assigned to multiple Reviewer [q,r,s,t,u....z]</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        }
        {handlecontrol === "NOT-AUTHENTICATED" &&
          <div>
            <NotAuthenticated />
          </div>}
      </div>

    );
  }
}

export default AssignEmployee;
