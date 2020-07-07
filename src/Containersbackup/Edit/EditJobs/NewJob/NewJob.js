import React, {Component} from 'react';
import {storage} from '../../../../firebase';
import firebase from '../../../../firebase';
import classes from './NewJob.module.css';


class NewJob extends Component {
  state = {
    currentPersonId:this.props.currentPersonId,
    jobEmployer:"",
    jobTitle:"",
    jobDescription:"",
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }  
     
  handleAddNewJob =(event)=>{
    event.preventDefault();
      let personId = this.state.currentPersonId;
      let jobEmployer=this.state.jobEmployer
      let jobTitle=this.state.jobTitle;
      let jobDescription = this.state.jobDescription;
      const jobsRef = firebase.database().ref(`persons/${personId}/jobs`);
      jobsRef.push({
        "jobEmployer":jobEmployer,
        "jobTitle":jobTitle,
        "jobDescription":jobDescription,
      })
      this.setState({jobTitle:"", jobDescription:"", jobEmployer:""});
    }

  render(){

    return (
      <div className = {classes.NewJob}>
           <label>Employer:</label>
          <input type="text" onChange = {this.handleChange} value = {this.state.jobEmployer} name = "jobEmployer" placeholder = "Employer"/>
          <label>Job Title:</label>
          <input type="text" onChange = {this.handleChange} value = {this.state.jobTitle} name = "jobTitle" placeholder = "Job Title"/>
          <label>Job Description:</label>
          <textarea cols = "45" rows="5" type = "textarea" onChange={this.handleChange} value = {this.state.jobDescription} name = "jobDescription" placeholder = "Job Description"/>
          <button onClick = {this.handleAddNewJob} >submit new job</button>
      </div>
        
    );
  } 
}


// export default Radium(UserPage);
export default NewJob;