import React from "react";
import classes from "./Job.module.css";

const job = (props)=>{
    let desc2 = <div></div>
    let desc3 = <div></div>

    if(props.jobDescription2){
        desc2 =  <li>{props.jobDescription2}</li>
    }
    if(props.jobDescription3){
        desc3 =  <li>{props.jobDescription3}</li>
    }

    return(
        <div className = {classes.Job}>
            <h2>{props.jobTitle}</h2>
            <h3>{props.jobEmployer}</h3>
            <ul>
                <li>{props.jobDescription}</li>
                {desc2}
                {desc3}
            </ul>
          </div>
    )
}

export default job;