import React, { Component } from 'react';
import ReviewForm from './review-form';
import NotAuthenticated from './../commom/not-authenticated';

import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            "ListofEmployee" : [],
            "department" : "",
            "position" :"",
            "className": "linkActive",
            "activeLink" : null
        }
    }

    async getData(){
        try
        {
          console.log(this.props.handlecontrol.loggedInUser)  
          if(this.props.handlecontrol.loggedInUser.isAdmin === true)
          {
              const getUpdatedList = await axios.get(appconfig.apibaseurl+"/assign-performance-review/get-all",axiosConfig);
              this.setState({
                  ListofEmployee : getUpdatedList.data.records
              });
              console.log(getUpdatedList.data.records);
          }
          else
          {
              const getUpdatedList = await axios.get(appconfig.apibaseurl+"/employee-performance-review-list/get-by-reviewer/"+this.props.handlecontrol.loggedInUser._id,axiosConfig);
              const count = getUpdatedList.data.count;
              if(count  > 0)
              {
                  this.setState({
                    ListofEmployee : getUpdatedList.data.records
                  });

                  console.log(getUpdatedList.data.records)
              }
              else
              {
                this.setState({
                    ListofEmployee : []
                });
                console.log("1234567890")  
              }
          }
        } 
        catch(e)
        {
              console.log(e);
        } 
        this.handleClick()
    }
    
    componentDidMount(){
        this.getData();
    }



    async componentDidUpdate(prevProps) {
        if (prevProps.handlecontrol !== this.props.handlecontrol) {
            this.getData()
        }    
      }

    handleClick = (_id,name,dept,position) => {         
        this.setState({
            "activeLink":_id,
            "name" : name,
            "department" : dept,
            "position" : position
        });
    }




        
    render(){
        const {name,department,position} = this.state;
        const {handlecontrol} = this.props;
        return (
            <div className="container-fluid">
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        {handlecontrol !== "NOT-AUTHENTICATED" && 
                        <div className="left-background" >
                            <div className="ProblemStatement">
                              Assigned Employee 
                            </div>
                            {this.state.ListofEmployee.map(single=>
                                <div 
                                className={single._id === this.state.activeLink ? "linkActive" : "problemList"}
                                onClick={() => this.handleClick(single._id,single.name,single.dept,single.position)}  key={single._id}>
                                {single.name}
                                </div>
                            )}
                            
                            
                        </div>
                        }
                    </div>   
                    <div className="col-sm-10">
                        <div className="right-background">                            
                            {name && department && position && <div className="JumbotronCustom">
                            <strong>Employee : </strong>{name}    <strong>Department : </strong>{department} <strong>Designation : </strong> {position}
                            </div>
                            }
                            
                            { handlecontrol !== "NOT-AUTHENTICATED" && 
                            <div className="JumbotronMainFrame">
                              <ReviewForm selectecdUser={this.state.activeLink} loggedInUserInfo={this.props.handlecontrol}/>
                            </div> 
                            }
                            { handlecontrol === "NOT-AUTHENTICATED" && 
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
 

     