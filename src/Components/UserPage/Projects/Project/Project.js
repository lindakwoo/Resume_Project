import React from "react";
import classes from "./Project.module.css";

const project = (props)=>{

    return(
        <div className = {classes.Project}>
            <div className = {classes.ProjectInfo}>
              <h2>{props.projectTitle}</h2>
              <h3>{props.projectDescription}</h3>
            </div>
            <img  className = {classes.ProjectPhoto} src = {props.photo}/>
          </div>
    )
}

export default project;
