import React from "react";
import classes from './EditJobs.module.css'
import NewJob from './Job/NewJob/NewJob';
import JobEdit from './Job/JobEdit/JobEdit';

const editJobs =(props)=>{

    return (
        <div className = {classes.Jobs}>
              <div className = {classes.CurrentJobs}>
                  Jobs:
                  {props.jobs}
              </div>
              <div className = {classes.NewJob}>
                Add a new job:
                <NewJob currentPersonId={props.currentPersonId}/>
              </div>
        </div>

    )


}

export default editJobs;