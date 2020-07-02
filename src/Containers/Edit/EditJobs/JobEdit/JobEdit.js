import React, {Component} from 'react';
import {storage} from '../../../../../firebase';
import firebase from '../../../../../firebase';
import classes from './JobEdit.module.css';


class JobEdit extends Component {
  state = {
    currentPersonId:this.props.currentPersonId,
    jobId:this.props.jobId,
    jobEmployer:this.props.jobEmployer,
    jobTitle:this.props.jobTitle,
    jobDescription:this.props.jobDescription,
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }  
  
  

  handleNewChangesToJob =(event)=>{
    event.preventDefault();
      let personId = this.state.currentPersonId;
      let jobId = this.state.jobId;
      let jobEmployer=this.state.jobEmployer;
      let jobTitle=this.state.jobTitle;
      let jobDescription=this.state.jobDescription;
      const jobsRef = firebase.database().ref(`persons/${personId}/jobs`);
      const jobRef = jobsRef.child(jobId)
      jobRef.update({
        "jobEmployer":jobEmployer,
        "jobTitle":jobTitle,
        "jobDescription":jobDescription
      })
  }

  render(){

    return (
      <div className = {classes.jobEdit}>
          <label>Employer:</label>
          <input type="text" onChange = {this.handleChange} value = {this.state.jobEmployer} name = "jobEmployer" placeholder = "Employer"/>
          <label>job Name:</label>
          <input type="text" onChange = {this.handleChange} value = {this.state.jobTitle} name = "jobTitle" placeholder = "Job Title"/>
          <label>job Description:</label>
          <textarea cols = "45" rows="5" type = "textarea" onChange={this.handleChange} value = {this.state.jobDescription} name = "jobDescription" placeholder = "Job Description"/>
          <button onClick = {this.handleNewChangesToJob} >submit changes to job</button>
      </div>
        
    )
  } 
}

export default JobEdit;