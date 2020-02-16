import React, { Component } from "react";

class ReviewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onRadioChange = this.onRadioChange.bind(this)
    this.onCheckboxChange = this.onCheckboxChange.bind(this)
    this.inputChange = this.inputChange.bind(this)
    this.save = this.save.bind(this)
  }

  onRadioChange(event){
     this.setState({
        [event.target.name] : event.target.value 
     });

  }

  onCheckboxChange(event){
    if(event.target.checked === true)
    {
        this.setState({
        [event.target.name] : event.target.value 
        });        
    }
    else
    {
        this.setState({
            [event.target.name] : "" 
        });         
    }
  }

  inputChange(event){
    this.setState({
      [event.target.name] : event.target.value 
      }); 
  }

  save(e){
      e.preventDefault();
      console.log(this.state);
      
      this.refs.form.reset();
      Object.keys(this.state).map((key) => {
        this.setState({[key] : null});
        return 0;
      });
  }

  componentDidMount() {
  }

  render() {

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
                  <input type="radio" value="1" name="teamplayer" checked={this.state.teamplayer === "1"} onChange={this.onRadioChange}/>
                  Bad
                </label>
              </td>
              <td>
                <label>
                  <input type="radio" value="2" name="teamplayer" checked={this.state.teamplayer === "2"} onChange={this.onRadioChange}/>
                  Good
                </label>
              </td>
              <td>
                <label>
                  <input type="radio" value="3" name="teamplayer" checked={this.state.teamplayer === "3"} onChange={this.onRadioChange}/>
                  Very Good
                </label>
              </td>
              <td>
                <label>
                  <input type="radio" value="4" name="teamplayer" checked={this.state.teamplayer === "4"} onChange={this.onRadioChange}/>
                  Awesome
                </label>
              </td>
            </tr>


            <tr className="table-row-height">
              <th scope="row">Participation</th>
              <td>
                <label>
                  <input type="checkbox" value="1" name="birthDayEvent" checked={this.state.birthDayEvent === "1"} onChange={this.onCheckboxChange}/>
                  Birth Day Event
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="2" name="appreciationEvent" checked={this.state.appreciationEvent === "2"} onChange={this.onCheckboxChange}/>
                  Appreciation Event
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="3" name="teambuildingEvent" checked={this.state.teambuildingEvent === "3"} onChange={this.onCheckboxChange}/>
                  Team building Event
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="4" name="hackathon" checked={this.state.hackathon === "4"} onChange={this.onCheckboxChange}/>
                  Hackathon
                </label>
              </td>
            </tr>

            <tr className="table-row-height">
              <th scope="row">Time Management</th>
              <td>
                <label>
                  <input type="radio" value="1" name="timemanagement" checked={this.state.timemanagement === "1"} onChange={this.onRadioChange}/>
                  Bad
                </label>
              </td>
              <td>
                <label>
                  <input type="radio" value="2" name="timemanagement" checked={this.state.timemanagement === "2"} onChange={this.onRadioChange}/>
                  Good
                </label>
              </td>
              <td>
                <label>
                  <input type="radio" value="3" name="timemanagement" checked={this.state.timemanagement === "3"} onChange={this.onRadioChange}/>
                  Very Good
                </label>
              </td>
              <td>
                <label>
                  <input type="radio" value="4" name="timemanagement" checked={this.state.timemanagement === "4"} onChange={this.onRadioChange}/>
                  Awesome
                </label>
              </td>
            </tr>

            <tr className="table-row-height">
              <th scope="row">Quick Learner</th>
              <td>
                <label>
                  <input type="radio" value="1" name="quicklearner" checked={this.state.quicklearner === "1"} onChange={this.onRadioChange}/>
                  Yes
                </label>
              </td>
              <td colSpan="3">
                <label>
                  <input type="radio" value="2" name="quicklearner" checked={this.state.quicklearner === "2"} onChange={this.onRadioChange}/>
                  No
                </label>
              </td>

            </tr>
            
            <tr className="table-row-height">
              <th scope="row">Personality</th>
              <td>
                <label>
                  <input type="checkbox" value="1" name="manofword" checked={this.state.manofword === "1"} onChange={this.onCheckboxChange}/>
                  Man of word
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="2" name="doer" checked={this.state.doer === "2"} onChange={this.onCheckboxChange}/>
                  Doer
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="3" name="honesty_dedication" checked={this.state.honesty_dedication === "3"} onChange={this.onCheckboxChange}/>
                  Honest and Dedicated
                </label>
              </td>
              <td>
                <label>
                  <input type="checkbox" value="4" name="worst" checked={this.state.worst === "4"} onChange={this.onCheckboxChange}/>
                  Worst Personality
                </label>
              </td>
            </tr>

            

          </tbody>
        </table>
        <div className="form-group">
            <label>Feedback : Write your feedback.</label>
            <textarea  className="form-control input-sm form-control-xs" name="comment" placeholder="Anything more you want to let us know.." onChange={this.inputChange}></textarea>
        </div>
        <div className="form-group">
            <button type="submit" className="btn btn-primary btn-sm" onClick={this.save}>Submit</button>
        </div> 
        </form>
      </React.Fragment>
    );
  }
}

export default ReviewForm;
