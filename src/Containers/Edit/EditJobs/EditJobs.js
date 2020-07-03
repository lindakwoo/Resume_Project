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
                        />
                    )
                })
            }      
        }    

    return (
        <div className = {classes.Jobs}>
              <div className = {classes.CurrentJobs}>
                <h1>Edit your jobs</h1>
                <div>{jobs}</div>
              </div>
              <div className = {classes.NewJob}>
                <h1>Add a new job</h1>
                <NewJob currentPersonId={props.currentPersonId}/>
              </div>
        </div>

    )


}

export default editJobs;