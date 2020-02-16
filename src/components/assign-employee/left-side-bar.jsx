import React, { Component } from 'react';
import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list : []
    };

  }

  
    componentDidUpdate(prevProps) {
      if (prevProps.content !== this.props.content) {
        this.setState({
          list : this.props.content
        });
      }

    }
    
    async componentDidMount(){
      const response = await axios.get(appconfig.apibaseurl+"/assign-performance-review/get-all",axiosConfig);
      this.setState({
        list : response.data.records
      });
    }


    selectEmployee = (selectedEmployee)=>{
      this.props.SendIdState({
        IdReceived: selectedEmployee
      });
      this.setState({
        selected : selectedEmployee
      });
    }

    delete= async (employeeId)=>{
      try
      {
        const response = await axios.delete(appconfig.apibaseurl+"/employee/"+employeeId,axiosConfig);
        this.setState({
          list : response.data.records
        });   
        if(response.status === 200)
        {
          swal({
            title: "Success!",
            text:
              "User Deeted",
            icon: "success",
            button: "ok"
          });
        }     
      }
      catch(e)
      {
        swal({
          title: "Error!",
          text:
            "Can't Delete User. Contact with Database Admin",
          icon: "error",
          button: "ok"
        });
      }

    }


    render() {
      return (
        <div className="column">
            <div className="col-body">
                <div id="preview">
                   { 
                      this.state.list && this.state.list.map(single=> 
                      (<React.Fragment>
                        <FontAwesomeIcon key={`delete_${single._id}`} onClick={()=>this.delete(single._id)} icon={faTrash} className="erasercolor"/>
                        <div className={this.state.selected === single._id ? "linkActive" : "problemList"} onClick={()=>this.selectEmployee(single._id)} key={`list_${single._id}`}> {single.name}  
                          <span className="rightEye" key={`delete_${single._id}`}> ({single.Records.length > 0 ? single.Records[0].reviewer_ids.length : 0 })</span>
                          </div>
                      </React.Fragment>)
                   
                   )}
                    
                </div>
            </div>
        </div>
      );
    }
  }

export default LeftSidebar;