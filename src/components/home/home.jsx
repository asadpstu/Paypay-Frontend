import React, { Component } from 'react';
import ReviewForm from './review-form';
import NotAuthenticated from './../commom/not-authenticated';

import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "ListofEmployee": [],
            "department": "",
            "position": "",
            "className": "linkActive",
            "activeLink": null
        }
    }

    async getData() {
        try {
            if (this.props.handlecontrol.loggedInUser.isAdmin === true) {
                const getUpdatedList = await axios.get(appconfig.apibaseurl + "/assign-performance-review/get-all", axiosConfig);
                this.setState({
                    ListofEmployee: getUpdatedList.data.records
                });

                //For getting all list
                var employee_reviewer = await axios.get(appconfig.apibaseurl + "/employee-performance-review-list/get-by-admin", axiosConfig);
                var list = [];
                console.log(employee_reviewer)
                //debugger
                for(var i=0;i<employee_reviewer.data.records.length;i++)
                {
                    console.log(employee_reviewer.data.records[i].reviewer.length);
                    for(var j=0;j<employee_reviewer.data.records[i].reviewer.length;j++)
                    {
                        let objectArray={}; 
                        objectArray["empoyee_id"] = employee_reviewer.data.records[i].toreview._id;
                        objectArray["employee"] = employee_reviewer.data.records[i].toreview.name;
                        objectArray["reviewer_id"] = employee_reviewer.data.records[i].reviewer[j]._id;
                        objectArray["reviewer"] = employee_reviewer.data.records[i].reviewer[j].name;
                        list.push(objectArray);
                    }
                }
                console.log(list);
                this.setState({
                    employee_reviewer: list
                });

            }
            else {
                const getUpdatedList = await axios.get(appconfig.apibaseurl + "/employee-performance-review-list/get-by-reviewer/" + this.props.handlecontrol.loggedInUser._id, axiosConfig);
                const count = getUpdatedList.data.count;
                if (count > 0) {
                    this.setState({
                        ListofEmployee: getUpdatedList.data.records
                    });

                }
                else {
                    this.setState({
                        ListofEmployee: []
                    });
                }
            }
        }
        catch (e) {
            //console.log(e);
        }
        this.handleClick()
    }

    componentDidMount() {
        this.getData();
        console.log("Tst");
        this.setState({
            checkAdmin : localStorage.getItem("isAdmin")
        })
    }



    async componentDidUpdate(prevProps) {
        if (prevProps.handlecontrol !== this.props.handlecontrol) {
            this.getData()
        }
    }

    handleClick = (_id, name, dept, position) => {
        this.setState({
            "activeLink": _id,
            "name": name,
            "department": dept,
            "position": position
        });
    }





    render() {
        const { name, department, position } = this.state;
        const { handlecontrol } = this.props;
        return (
            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                    <React.Fragment>
                        {
 
                            handlecontrol !== "NOT-AUTHENTICATED" &&
                            <div className="left-background" >
                                <div className="ProblemStatement">
                                    Assigned Employee
                                </div>
                                {this.state.ListofEmployee && this.state.ListofEmployee.map(single =>
                                    <div
                                        className={single._id === this.state.activeLink ? "linkActive" : "problemList"}
                                        onClick={() => this.handleClick(single._id, single.name, single.dept, single.position)} key={single._id}>
                                        {single.name}
                                    </div>
                                )}

                                {this.state.ListofEmployee.length < 1 &&
                                    <div>
                                        <small>No review requested yet.  </small>
                                    </div>
                                }

                            </div>

                            
                            


                        }
                        {
                            handlecontrol !== "NOT-AUTHENTICATED" && 
                            this.state.checkAdmin === "true" &&
                                <div>
                                   <div className="assignEmployee">
                                    <small>Performance vs Reviewer</small>
                                    </div> 
                                   {this.state.employee_reviewer && <div>{
                                     this.state.employee_reviewer.map(single=><div key={single._id} className="problemList"><strong><smal>{single.employee}</smal></strong>-<small>{single.reviewer}</small></div>)  
                                    } </div>}
                                 </div>   
                                
                            
                        }
                        </React.Fragment>
                        
                    </div>
                    <div className="col-sm-10">
                        <div className="right-background">
                            {name && department && position && <div className="JumbotronCustom">
                                <strong>Employee : </strong>{name}    <strong>Department : </strong>{department} <strong>Designation : </strong> {position}
                            </div>
                            }

                            {handlecontrol !== "NOT-AUTHENTICATED" &&
                                <div className="JumbotronMainFrame">
                                    <ReviewForm selectecdUser={this.state.activeLink} loggedInUserInfo={this.props.handlecontrol} />
                                </div>
                            }
                            {handlecontrol === "NOT-AUTHENTICATED" &&
                                <div className="JumbotronMainFrame">
                                    <NotAuthenticated />
                                </div>
                            }


                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

export default Home;


