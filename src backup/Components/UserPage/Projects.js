import React from 'react';
import classes from './Projects.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components';


const projects =(props)=> {

    let ImageDiv = styled.img`
        width:65%;
        text-align:center;
        @media(min-width:600px){
        width:450px
        }
    `
    let projects = <div>no projects at this time</div> 
    if(props.currentPerson["username"]){
      if(props.currentPerson["projects"].length>0){
        projects = props.currentPerson["projects"].map(project=>{
          return <div className = {classes.Project} key = {project['id']}>
            <div className = {classes.ProjectHeader}>
              <h2>{project["projectTitle"]}</h2>
              <h3>{project["projectDescription"]}</h3>
            </div>
            <img  className = {classes.ProjectPhoto} src = {project["photo"]}/>
          </div>
        })
      }
    }


    return (
        <div className={classes.ProjectsContainer}>
        <h1>Projects</h1>
        <div className={classes.Projects}>
          {projects}
        </div>
        </div>
        
    );
 
}

// export default Radium(UserPage);
export default projects;