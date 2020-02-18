import React, { Component } from "react";
import ReviewForm from "./review-form";
import NotAuthenticated from "./../commom/not-authenticated";

import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListofEmployee: [],
      department: "",
      position: "",
      className: "linkActive",
      reviewed_id: null,
      isLoading: true,
    };
  }

  async getData() {
    const {handlecontrol} = this.props;
    try {
      if (handlecontrol.loggedInUser.isAdmin === true) {
        const getUpdatedList = await axios.get(
          appconfig.apibaseurl + "/assign-performance-review/get-all",
          axiosConfig
        );
        this.setState({
          ListofEmployee: getUpdatedList.data.records
        });

        //For getting all list
        var employee_reviewer = await axios.get(
          appconfig.apibaseurl +
            "/employee-performance-review-list/get-by-admin",
          axiosConfig
        );
        var list = [];
        //debugger
        
        for (var i = 0; i < employee_reviewer.data.records.length; i++) 
        {
          for (var j = 0;j < employee_reviewer.data.records[i].reviewer.length;j++) 
          {
            let objectArray = {};
            objectArray["employee_id"] = employee_reviewer.data.records[i].toreview._id;
            objectArray["employee"] = employee_reviewer.data.records[i].toreview.name;
            objectArray["dept"] = employee_reviewer.data.records[i].toreview.dept;
            objectArray["position"] = employee_reviewer.data.records[i].toreview.position;
            objectArray["reviewer_id"] = employee_reviewer.data.records[i].reviewer[j]._id;
            objectArray["reviewer"] = employee_reviewer.data.records[i].reviewer[j].name;
            list.push(objectArray);
          }
        }
        this.setState({employee_reviewer: list});
        
      } 
      else 
      {
        const getUpdatedList = await axios.get(appconfig.apibaseurl +"/employee-performance-review-list/get-by-reviewer/" +handlecontrol.loggedInUser._id,axiosConfig);
        const count = getUpdatedList.data.count;
        if (count > 0) {
          this.setState({
            ListofEmployee: getUpdatedList.data.records
          });
        } else {
          this.setState({
            ListofEmployee: []
          });
        }
        
      }
      this.setState({ isLoading: false })
      
    } catch (e) {
      //console.log(e);
      this.setState({ isLoading: false })
    }
  }

  componentDidMount() {

    this.getData();
    
    this.setState({
      checkAdmin: localStorage.getItem("isAdmin"),
      isLoading : true
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.handlecontrol !== this.props.handlecontrol) {
      this.getData();
      
    }
  }

  handleClick = (reviewed_id, name, dept, position,reviewer_id,applyCss) => {
    //seting current state to pass review-form component as props
    this.setState({
      reviewed_id: reviewed_id,
      reviewer_id : reviewer_id,
      name: name,
      department: dept,
      position: position,
      applyCss : applyCss
    });
  };



  render() {
    const { name, department, position,reviewed_id,reviewer_id,applyCss,ListofEmployee,checkAdmin,employee_reviewer,isLoading } = this.state;
    const { handlecontrol } = this.props;
    return (
      <div className="container-fluid">
        <div className="row content">
          <div className="col-sm-2 sidenav">
            <React.Fragment>
              {handlecontrol !== "NOT-AUTHENTICATED" && (
                <div className="left-background">
                  {checkAdmin === "true" ? (
                    <div className="ProblemStatement">
                      Admin Review list(all)
                    </div>
                  ) : (
                    <div className="ProblemStatement">
                      Your Review List(Assigned)
                    </div>
                  )}

                  {ListofEmployee &&
                    ListofEmployee.map(single => (
                      <div
                        className={
                          single._id === reviewed_id && 'indivisual' === applyCss
                            ? "linkActive"
                            : "problemList"
                        }
                        onClick={() =>
                          this.handleClick(
                            single._id,
                            single.name,
                            single.dept,
                            single.position,
                            this.props.handlecontrol.loggedInUser._id,  //self id as reviewer
                            'indivisual'
                          )
                        }
                        key={single._id}
                      >
                        {single.name}
                      </div>
                    ))}

                  {ListofEmployee.length < 1 && (
                    <div>
                      <small>No review requested yet. </small>
                    </div>
                  )}
                </div>
              )}
              {handlecontrol !== "NOT-AUTHENTICATED" &&
                checkAdmin === "true" && (
                  <div>
                    <div className="ProblemStatement-copy">
                      Performance vs Reviewer 
                    </div>
                    {isLoading ? 'Please wait ...' : ''}
                    {employee_reviewer && (
                      
                      
                      <div>
                        
                        {this.state.employee_reviewer.map((single,index) => (
                          <div key={index} 
                          onClick={() =>
                            this.handleClick(
                              single.employee_id,
                              single.employee,
                              single.dept,
                              single.position,
                              single.reviewer_id,
                              'generic'
                            )
                          }
                          className={
                              single.employee_id === reviewed_id 
                              && single.reviewer_id === reviewer_id 
                              && 'generic' === applyCss ? "linkActive" : "problemList"}
                              
                              >
                            
                              <small>{single.employee}</small>
                            
                              -<small>by {single.reviewer}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
            </React.Fragment>
          </div>
          <div className="col-sm-10">
            <div className="right-background">
              {name && department && position && (
                <div className="JumbotronCustom">
                  <strong>Employee : </strong>
                  {name} <strong>Department : </strong>
                  {department} <strong>Designation : </strong> {position}
                </div>
              )}

              {handlecontrol !== "NOT-AUTHENTICATED" && (
                <div className="JumbotronMainFrame">
                  <ReviewForm
                    reviewed_id={reviewed_id}
                    loggedInUserInfo={this.props.handlecontrol}
                    reviewer_id={reviewer_id}
                  />
                </div>
              )}
              {handlecontrol === "NOT-AUTHENTICATED" && (
                <div className="JumbotronMainFrame">
                  <NotAuthenticated />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
