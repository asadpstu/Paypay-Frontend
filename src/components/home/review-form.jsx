import React, { Component } from "react";
import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";
import swal from "sweetalert";

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      selectedEmployee: "",
      reviewerid: ""

    };

    this.onRadioChange = this.onRadioChange.bind(this)
    this.onCheckboxChange = this.onCheckboxChange.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.save = this.save.bind(this)
  }

  onRadioChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });

  }

  onCheckboxChange(event) {
    if (event.target.checked === true) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
    else {
      this.setState({
        [event.target.name]: ""
      });
    }
  }

  inputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async save(e) {
    e.preventDefault();
    const cretateObject = [];
    Object.keys(this.state).map((key) => {
      if (key !== "comment" && key !== "reviewerid" && key !== "selectedEmployee") {
        var singlePair = {
          "name": key,
          "value": this.state[key]
        }
        cretateObject.push(singlePair);
      }

      return 0;
    });

    const postobject = {
      "employee_id": this.state.selectedEmployee,
      "performance_review": cretateObject,
      "reviewer_feedback": this.state.comment,
      "reviewer_id": this.state.reviewerid
    }


    try {
      const response = await axios.post(
        appconfig.apibaseurl + "/add/employee-performane-review",
        postobject,
        axiosConfig
      );
      if (response) {
        swal({
          title: "Successfull",
          text: "Thank you for your time to let us know your thought.",
          icon: "success",
          button: "ok"
        });
        Object.keys(this.state).map((key) => {
          if (key !== "reviewerid") {
            this.setState({ [key]: '' });
          }

          return 0;
        });

      }
    }
    catch (e) {
      swal({
        title: "Unsuccessfull",
        text: "Server error.Please try again.",
        icon: "error",
        button: "ok"
      });
    }



  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectecdUser !== this.props.selectecdUser) {
      this.setState({
        selectedEmployee: this.props.selectecdUser,
        reviewerid: this.props.loggedInUserInfo.loggedInUser._id
      })
      if (this.props.selectecdUser && this.props.loggedInUserInfo) {
        this.getReviewby_ReviewerId_EmployeeId(this.props.loggedInUserInfo.loggedInUser._id, this.props.selectecdUser);
      }
    }

  }

  async getReviewby_ReviewerId_EmployeeId(reviewerId, selectedEmployee) {

    Object.keys(this.state).map((key) => {
      if (key !== "reviewerid" && key !== "selectedEmployee") {
        this.setState({ [key]: '' });
      }

      return 0;
    });

    //
    const response = await axios.get(appconfig.apibaseurl + "/view/employee-performane-review/" + reviewerId + "/" + selectedEmployee, axiosConfig);
    if (response.data.result !== "empty") {
      this.setState({ comment: response.data.records.reviewer_feedback });
      for (var i = 0; i < response.data.records.performance_review.length; i++) {
        this.setState({
          [response.data.records.performance_review[i].name]: response.data.records.performance_review[i].value
        });
      }
    }


  }

  render() {
    const {teamplayer,birthDayEvent,appreciationEvent,teambuildingEvent,hackathon,timemanagement,quicklearner,manofword,doer,honesty_dedication,worst,comment} = this.state;
    return (
      <React.Fragment>
        <form ref="form">
          <table className="table table-bordered table-sm fontSizeForReview">
            <thead>
              <tr className="table-row-height">
                <th scope="col">Category</th>
                <td colSpan="4">
                  Your Opinion
              </td>
              </tr>
            </thead>
            <tbody>

              <tr className="table-row-height">
                <th scope="row">Team Player</th>
                <td>
                  <label>
                    <input type="radio" value="1" name="teamplayer" checked={teamplayer === "1"} onChange={this.onRadioChange} />
                    Bad
                </label>
                </td>
                <td>
                  <label>
                    <input type="radio" value="2" name="teamplayer" checked={teamplayer === "2"} onChange={this.onRadioChange} />
                    Good
                </label>
                </td>
                <td>
                  <label>
                    <input type="radio" value="3" name="teamplayer" checked={teamplayer === "3"} onChange={this.onRadioChange} />
                    Very Good
                </label>
                </td>
                <td>
                  <label>
                    <input type="radio" value="4" name="teamplayer" checked={teamplayer === "4"} onChange={this.onRadioChange} />
                    Awesome
                </label>
                </td>
              </tr>


              <tr className="table-row-height">
                <th scope="row">Participation</th>
                <td>
                  <label>
                    <input type="checkbox" value="1" name="birthDayEvent" checked={birthDayEvent === "1"} onChange={this.onCheckboxChange} />
                    Birth Day Event
                </label>
                </td>
                <td>
                  <label>
                    <input type="checkbox" value="2" name="appreciationEvent" checked={appreciationEvent === "2"} onChange={this.onCheckboxChange} />
                    Appreciation Event
                </label>
                </td>
                <td>
                  <label>
                    <input type="checkbox" value="3" name="teambuildingEvent" checked={teambuildingEvent === "3"} onChange={this.onCheckboxChange} />
                    Team building Event
                </label>
                </td>
                <td>
                  <label>
                    <input type="checkbox" value="4" name="hackathon" checked={hackathon === "4"} onChange={this.onCheckboxChange} />
                    Hackathon
                </label>
                </td>
              </tr>

              <tr className="table-row-height">
                <th scope="row">Time Management</th>
                <td>
                  <label>
                    <input type="radio" value="1" name="timemanagement" checked={timemanagement === "1"} onChange={this.onRadioChange} />
                    Bad
                </label>
                </td>
                <td>
                  <label>
                    <input type="radio" value="2" name="timemanagement" checked={timemanagement === "2"} onChange={this.onRadioChange} />
                    Good
                </label>
                </td>
                <td>
                  <label>
                    <input type="radio" value="3" name="timemanagement" checked={timemanagement === "3"} onChange={this.onRadioChange} />
                    Very Good
                </label>
                </td>
                <td>
                  <label>
                    <input type="radio" value="4" name="timemanagement" checked={timemanagement === "4"} onChange={this.onRadioChange} />
                    Awesome
                </label>
                </td>
              </tr>

              <tr className="table-row-height">
                <th scope="row">Quick Learner</th>
                <td>
                  <label>
                    <input type="radio" value="1" name="quicklearner" checked={quicklearner === "1"} onChange={this.onRadioChange} />
                    Yes
                </label>
                </td>
                <td colSpan="3">
                  <label>
                    <input type="radio" value="2" name="quicklearner" checked={quicklearner === "2"} onChange={this.onRadioChange} />
                    No
                </label>
                </td>

              </tr>

              <tr className="table-row-height">
                <th scope="row">Personality</th>
                <td>
                  <label>
                    <input type="checkbox" value="1" name="manofword" checked={manofword === "1"} onChange={this.onCheckboxChange} />
                    Man of word
                </label>
                </td>
                <td>
                  <label>
                    <input type="checkbox" value="2" name="doer" checked={doer === "2"} onChange={this.onCheckboxChange} />
                    Doer
                </label>
                </td>
                <td>
                  <label>
                    <input type="checkbox" value="3" name="honesty_dedication" checked={honesty_dedication === "3"} onChange={this.onCheckboxChange} />
                    Honest and Dedicated
                </label>
                </td>
                <td>
                  <label>
                    <input type="checkbox" value="4" name="worst" checked={worst === "4"} onChange={this.onCheckboxChange} />
                    Worst Personality
                </label>
                </td>
              </tr>



            </tbody>
          </table>
          <div className="form-group">
            <label>Feedback : Write your feedback.</label>
            <textarea className="form-control input-sm form-control-xs" name="comment" placeholder="Anything more you want to let us know.." onChange={this.inputChange} value={comment}></textarea>
          </div>
          <div className="form-group">
            <button disabled={!this.state.selectedEmployee ? true : false} type="submit" className="btn btn-info btn-sm" onClick={this.save}>{!this.state.selectedEmployee ? 'Note : To continue please select an Employee from Left side ( Assigned Employee section) if list is available' : 'Submit'}</button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default ReviewForm;
