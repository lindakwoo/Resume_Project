import React from "react";
import classes from './EditJobs.module.css'
import NewJob from './NewJob/NewJob';
import JobEdit from './JobEdit/JobEdit';

const editJobs =(props)=>{

    let jobs = <div>no jobs at this time</div>
        if(props.currentPerson["username"]){
            if(props.currentPerson["jobs"].length>0){
                jobs = props.jobs.map(job=>{
                    return (
                      <JobEdit
                        key = {job["id"]}
                        currentPersonId = {props.currentPersonId}
                        jobId = {job["id"]}
                        jobEmployer = {job["jobEmployer"]}
                        jobTitle = {job["jobTitle"]}
                        jobDescription = {job["jobDescription"]}
                        jobDescription2 = {job["jobDescription2"]}
                        jobDescription3 = {job["jobDescription3"]}
                        deleteJobFromEdit={props.deleteJobFromEdit}
                        />
                    )
                })
            }      
        }    

    return (
        <div className = {classes.EditJobs}>
              <div className = {classes.CurrentJobs}>
                <div>{jobs}</div>
              </div>
              <div className = {classes.NewJob}>
                <h3>Add a new job</h3>
                <NewJob currentPersonId={props.currentPersonId} addJobToEdit = {props.addJobToEdit}/>
              </div>
        </div>

    )


}

export default editJobs;