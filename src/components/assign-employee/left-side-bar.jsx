import React, { Component } from 'react';
import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";
import { faTrash, faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };

  }


  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      this.setState({
        list: this.props.content
      });
    }

  }

  async componentDidMount() {
    const response = await axios.get(appconfig.apibaseurl + "/assign-performance-review/get-all", axiosConfig);
    this.setState({
      list: response.data.records
    });
  }


  selectEmployee = (selectedEmployee) => {
    this.props.SendIdState({
      IdReceived: selectedEmployee
    });
    this.setState({
      selected: selectedEmployee
    });
  }

  delete = async (employeeId) => {
    try {
      const response = await axios.delete(appconfig.apibaseurl + "/employee/" + employeeId, axiosConfig);
      if (response.status === 200) {
        swal({
          title: "Success!",
          text:
            "User Deleted",
          icon: "success",
          button: "ok"
        });
        window.location.reload();
      }
    }
    catch (e) {
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
    const {list,selected} = this.state;
    return (
      <React.Fragment>
      <div className="ProblemStatement">Employee  vs  Reviewer(count)</div>
      <div className="column">
        <div className="col-body">
          <div id="preview">
            {
              list && list.map(single =>
                (<div onClick={() => this.selectEmployee(single._id)} className={selected === single._id ? "linkActive" : "ListForLeftSideBar"} key={`sibling_${single._id}`}>
                  

                    <div align="left" key={`list_${single._id}`}>
                    {
                    !single.isAdmin ? 
                    
                    <FontAwesomeIcon key={`check_${single._id}`} disabled={single.Records.length > 0 ? true : false} onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.delete(single._id) }} icon={faTrash} className="erasercolor" /> : <FontAwesomeIcon key={`check_${single._id}`} onClick={(e) => { alert('Admin account is restricted to delete') }} icon={faBan} className="erasercolor" />
                    }
                      
                      &nbsp; <strong>{single.name}</strong>
                    - <small>will be reviewed by {single.Records.length > 0 ? single.Records[0].reviewer_ids.length : 0} pax.</small>
                    </div>
                  </div>
                )

              )}

          </div>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default LeftSidebar;