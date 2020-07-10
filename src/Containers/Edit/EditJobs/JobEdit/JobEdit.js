import React, {Component} from 'react';
import {storage} from '../../../../firebase';
import firebase from '../../../../firebase';
import classes from './JobEdit.module.css';


class JobEdit extends Component {
  state = {
    currentPersonId:this.props.currentPersonId,
    jobId:this.props.jobId,
    jobEmployer:this.props.jobEmployer,
    jobTitle:this.props.jobTitle,
    jobDescription:this.props.jobDescription,
    jobDescription2:this.props.jobDescription2,
    jobDescription3:this.props.jobDescription3,
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
      let jobDescription2=this.state.jobDescription2;
      let jobDescription3=this.state.jobDescription3;
      const jobsRef = firebase.database().ref(`persons/${personId}/jobs`);
      const jobRef = jobsRef.child(jobId)
      jobRef.update({
        "jobEmployer":jobEmployer,
        "jobTitle":jobTitle,
        "jobDescription":jobDescription,
        "jobDescription2":jobDescription2,
        "jobDescription3":jobDescription3
      })
  }

  deleteJob =(event)=>{
    event.preventDefault();
    let personId = this.state.currentPersonId;
    let jobId = this.state.jobId;
    const jobsRef = firebase.database().ref(`persons/${personId}/jobs`);
    const jobRef = jobsRef.child(jobId)
    jobRef.remove()
    {this.props.deleteJobFromEdit(jobId)}
  }

  render(){

    return (
      <div className = {classes.JobEditContainer}>
      <div className = {classes.JobEdit}>
        <div className = {classes.JobEmployer}>
          <label>Employer:</label>
          <input type="text" onChange = {this.handleChange} value = {this.state.jobEmployer} name = "jobEmployer" placeholder = "Employer"/>
        </div>
        <div className = {classes.JobTitle}>
          <label>Job Title:</label>
          <input type="text" onChange = {this.handleChange} value = {this.state.jobTitle} name = "jobTitle" placeholder = "Job Title"/>
        </div>
        <div className = {classes.JobDescription}>
          <label>Job Accomplishments:</label>
          <textarea cols = "55" rows="2" type = "textarea" onChange={this.handleChange} value = {this.state.jobDescription} name = "jobDescription" placeholder = "Accomplishment"/>  
          <textarea cols = "55" rows="2" type = "textarea" onChange={this.handleChange} value = {this.state.jobDescription2} name = "jobDescription2" placeholder = "Accomplishment"/>  
          <textarea cols = "55" rows="2" type = "textarea" onChange={this.handleChange} value = {this.state.jobDescription3} name = "jobDescription3" placeholder = "Accomplishment"/>   
        </div>
        <button className = {classes.Delete} onClick = {this.deleteJob}><span className ={classes.DeleteX}>X</span><span className = {classes.DeleteText}>Delete Job</span> </button>
      </div>
      <button className = {classes.ChangesToJob} onClick = {this.handleNewChangesToJob} >Submit Changes</button>
      </div>
        
    )
  } 
}

export default JobEdit;