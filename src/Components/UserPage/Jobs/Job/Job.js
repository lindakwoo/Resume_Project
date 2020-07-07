import React from "react";
import classes from "./Job.module.css";

const job = (props)=>{

    return(
        <div className = {classes.Job}>
            <h2>{props.jobTitle}</h2>
            <h3>{props.jobEmployer}</h3>
            <p>{props.jobDescription}</p>
          </div>
    )
}

export default job;