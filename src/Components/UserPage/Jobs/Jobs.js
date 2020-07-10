import React from 'react';
import classes from './Jobs.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components';
import Job from './Job/Job';


const jobs =(props)=> {
 
    let jobs = <div>no jobs at this time</div>

    if(props.currentPerson["username"]){
    if(props.currentPerson['jobs'].length>0){
        jobs = props.currentPerson["jobs"].map(job=>{
        return <Job 
        key = {job['id']}
        jobTitle = {job["jobTitle"]}
        jobEmployer = {job["jobEmployer"]}
        jobDescription = {job["jobDescription"]}
        jobDescription2 = {job["jobDescription2"]}
        jobDescription3 = {job["jobDescription3"]}
        />
        }) 
    }       
    }
    return (
        <div className={classes.Jobs}>
        {jobs}
        </div>
        
    );
 
}

// export default Radium(UserPage);
export default jobs;