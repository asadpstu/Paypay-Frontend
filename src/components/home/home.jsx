import React, { Component } from 'react';
import ReviewForm from './review-form';
import NotAuthenticated from './../commom/not-authenticated';



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

    getData(){
        const empolyee = [
            {"_id":"1","name" : "Md. A","department": "R&D","position":"Full-stack"},
            {"_id":"2","name" : "Mr. X","department": "R&D","position":"Full-stack"},
            {"_id":"3","name" : "Mr. Y","department": "R&D","position":"Full-stack"}, 
            {"_id":"4","name" : "Mr. Z","department": "R&D","position":"Full-stack"}
        ];
        

        this.setState({
            "ListofEmployee" : empolyee,
        });
        this.handleClick()
        
    }
    
    componentDidMount(){
        this.getData();
    }

    handleClick = (id,name,department,position) => {         
        this.setState({
            "activeLink":id,
            "name" : name,
            "department" : department,
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
                        {handlecontrol != "NOT-AUTHENTICATED" && 
                        <div className="left-background" >
                            <div className="ProblemStatement">
                              Assigned Employee 
                            </div>
                            {this.state.ListofEmployee.map(single=>
                                <div 
                                className={(single._id === this.state.activeLink ? "linkActive" : "problemList")}
                                onClick={() => this.handleClick(single._id,single.name,single.department,single.position)}  key={single._id}>
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
                            
                            { handlecontrol != "NOT-AUTHENTICATED" && 
                            <div className="JumbotronMainFrame">
                              <ReviewForm />
                            </div> 
                            }
                            { handlecontrol == "NOT-AUTHENTICATED" && 
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
 

     