import React from 'react';
import classes from './Jobs.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components';


const jobs =(props)=> {
 
    let jobs = <div>no jobs at this time</div>

    if(props.currentPerson["username"]){
    if(props.currentPerson['jobs'].length>0){
        jobs = props.currentPerson["jobs"].map(job=>{
        return <div key = {job['id']}>
            <h2>{job["jobTitle"]}</h2>
            <h3>{job["jobEmployer"]}</h3>
            <p>{job["jobDescription"]}</p>
        </div>
        }) 
    }       
    }
    return (
        <div className={classes.Jobs}>
        <h1>Jobs</h1>
        {jobs}
        </div>
        
    );
 
}

// export default Radium(UserPage);
export default jobs;