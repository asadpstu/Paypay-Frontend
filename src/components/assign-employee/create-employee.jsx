import React, { Component } from "react";
import axios from "axios";
import axiosConfig from "../../service/token";
import appconfig from "../../config/config";
import swal from "sweetalert";
import joi from "joi-browser";

class CreateEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
        error : {},
        name : "",
        passport : "",
        dept: "",     
        email : "",
        password : "",
        position : "",
        contact : "",
        country : ""
    };
    this.save = this.save.bind(this);
    this.update = this.update.bind(this);
    this.buildObject = this.buildObject.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validationSchema = {
      "name" : joi.string().min(3).required().label("User name"),
      "passport" : joi.string().min(6).required().label("Passport/NID"),
      "dept": joi.string().required().label("Department"),     
      "email" : joi.string().email({ minDomainAtoms: 2 }).required().label("Email"),
      "password" : joi.string().min(5).required().label("Password"),
      "position" : joi.string().required().label("Position"),
      "contact" : joi.string().max(13).required().label("Mobile number"),
      "country" : joi.string().max(25).required().label("Country")

  }

  componentDidUpdate(prevProps) {
    if (prevProps.IdReceived !== this.props.IdReceived) {
      this.setState({
        receivedId : this.props.IdReceived
      });
      this.getuserinformation(this.props.IdReceived);
    }


  }

  async getuserinformation(employeeId)
  {
    try
    {
      const getUserInfo = await axios.get(appconfig.apibaseurl+"/employee/"+employeeId,axiosConfig);
      console.log(getUserInfo);  
      if(getUserInfo.status === 200)
      {
         this.setState({
          name : getUserInfo.data.Data.name,
          passport : getUserInfo.data.Data.passport,
          dept: getUserInfo.data.Data.dept,     
          email : getUserInfo.data.Data.email,
          password : getUserInfo.data.Data.password,
          position : getUserInfo.data.Data.position,
          contact : getUserInfo.data.Data.contact,
          country : getUserInfo.data.Data.country
         });
      }    
    }
    catch(e)
    {
      swal({
        title: "Failed",
        text: "Unable to fetch data",
        icon: "warning",
        button: "ok"
      });
    }

    console.log(this.state);
  }

  buildObject(e){
      this.setState({
          [e.target.name] : e.target.value
      });
  }
  async save(event){
      event.preventDefault();
      const postData = {
        "name" : this.state.name,
        "passport" : this.state.passport,
        "dept" : this.state.dept,
        "email":this.state.email,
        "password":this.state.password,
        "position" :this.state.position,
        "contact" : this.state.contact,
        "country" : this.state.country
      }
      const isValid = joi.validate(postData,this.validationSchema,{abortEarly : false});
      if(isValid.error)
      {
          const error = {};
          for(let item of isValid.error.details)
          {
            
            error[item.path[0]] = item.message;
            
          }

          this.setState({
              error : error 
          });

         return; 
      }
      else
      {
        this.setState({
            error : {} 
        });
      }
      try
      {
        const response = await axios.post(
            appconfig.apibaseurl+"/employee",
            postData,
            axiosConfig
        );   
        if(response.status === 200)
        {
            swal({
                title: "Successfull",
                text: "New Employee creted! ",
                icon: "success",
                button: "ok",
            });

            this.setState({
                "name" : null,
                "passport" : null,
                "dept" : null,
                "email":null,
                "password":null,
                "position" :null,
                "contact" : null,
                "country" : null
            });

            this.refs.form.reset();
            this.handleChange();
            
        }       
      }
      catch(e)
      {
        swal({
            title: "Failed",
            text:  "Duplicate record found!",
            icon: "error",
            button: "ok",
        });

      }        
      
  }

  async update(event){
    event.preventDefault();
    console.log(event);
    
    const postData = {
      "name" : this.state.name,
      "passport" : this.state.passport,
      "dept" : this.state.dept,
      "email":this.state.email,
      "password":this.state.password,
      "position" :this.state.position,
      "contact" : this.state.contact,
      "country" : this.state.country
    }
    const isValid = joi.validate(postData,this.validationSchema,{abortEarly : false});
    if(isValid.error)
    {
        const error = {};
        for(let item of isValid.error.details)
        {
          
          error[item.path[0]] = item.message;
          
        }

        this.setState({
            error : error 
        });

       return; 
    }
    else
    {
      this.setState({
          error : {} 
      });
    }
    try
    {
      const response = await axios.put(
          appconfig.apibaseurl+"/employee/"+this.props.IdReceived,
          postData,
          axiosConfig
      );   
      if(response.status === 200)
      {
          swal({
              title: "Successfull",
              text: "Record Updated ",
              icon: "success",
              button: "ok",
          });

          //this.refs.form.reset();
          this.handleChange();
          
      }       
    }
    catch(e)
    {
      swal({
          title: "Failed",
          text:  "Something went wrong",
          icon: "error",
          button: "ok",
      });

    }        
    
}

  //It will retrive latest list of Employee Review with Number of Reviewer
  async handleChange(event) 
  {
    const getallAssignedReview = await axios.get(appconfig.apibaseurl+"/assign-performance-review/get-all",axiosConfig);
    
    this.props.liftState({
      content: getallAssignedReview.data.records
    });
    console.log(getallAssignedReview);

  } 

  render() {
    return (
        <form ref="form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              className= {this.state.error.name ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}              
              placeholder="Employee name"
              onChange={this.buildObject}
              error={this.state.error.name}
              value={this.state.name}
            />
            {this.state.error.name && <span className="spanAlert">{this.state.error.name}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="passport"
              className= {this.state.error.passport ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}             
              placeholder="Passport/NID"
              onChange={this.buildObject} 
              value={this.state.passport}
            />
            {this.state.error.passport && <span className="spanAlert">{this.state.error.passport}</span>}
          </div>
          <div className="form-group">

            <select name="dept" onChange={this.buildObject} value={this.state.dept} className= {this.state.error.dept ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}>
              <option >Please select a department</option>  
              <option>Business</option>
              <option>Rnd</option>
              <option>IoT</option>
              <option>Finance</option>
            </select>
            {this.state.error.dept && <span className="spanAlert">{this.state.error.name} </span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className= {this.state.error.email ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}             
              placeholder="Employee email"
              onChange={this.buildObject}
              value={this.state.email}
            />
            {this.state.error.email && <span className="spanAlert">{this.state.error.email}</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className= {this.state.error.password ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}             
              placeholder="Password (Min 5 character)"
              onChange={this.buildObject}
              // disabled={this.state.password ? true : false}
              // value={this.state.password}
            />
            {this.state.error.password && <span className="spanAlert">{this.state.error.password}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="position"
              className= {this.state.error.position ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}             
              placeholder="Ex. Designation. (Fullstack,Backend,Frontend,DevOps,etc*)"
              onChange={this.buildObject}
              value={this.state.position}
            />
            {this.state.error.position && <span className="spanAlert">{this.state.error.position}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="contact"
              className= {this.state.error.contact ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}             
              placeholder="Mobile Number"
              onChange={this.buildObject}
              value={this.state.contact}
            />
            {this.state.error.contact && <span className="spanAlert">{this.state.error.contact}</span>}
          </div>
          <div className="form-group">
            <select
              name="country"
              className= {this.state.error.country ? "form-control form-control-sm alertError" : "form-control form-control-sm alertErrorResolved"}
              onChange={this.buildObject}
              value={this.state.country}
            >
              <option >Please select a country</option>
              <option>America</option>
              <option>Bangladesh</option>
              <option>Canada</option>
              <option>Denmark</option>
              <option>Estonia</option>
              <option>Finland</option>
              <option>Germany</option>
              <option>Hungery</option>
              <option>India</option>
              <option>Japan</option>
              <option>Lusotho</option>
              <option>Myanmar</option>
              <option>Nigeria</option>
              <option>Other</option>
            </select>
            {this.state.error.country && <span className="spanAlert">{this.state.error.country}</span>}
          </div>
          
          {this.props.IdReceived && <div className="form-group" >
            <button type="submit" onClick={this.update} className="btn btn-primary btn-sm">Update selected Employee Profile</button>
          </div>}

          {!this.props.IdReceived && <div className="form-group" >
            <button type="submit" onClick={this.save} className="btn btn-primary btn-sm">Save as new employee</button>
          </div>}
          
          {/* <textarea id="editor" placeholder="Enter text here" onChange={this.handleChange}></textarea> */}
        </form>
    );
  }
}

export default CreateEmployee;
