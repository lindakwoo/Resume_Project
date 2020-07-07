import React from 'react';
import classes from './Projects.module.css';
import Radium from "radium";
import {StyleRoot} from "radium";
import styled from 'styled-components';
import Project from './Project/Project';


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
          return (
            <Project 
              key =  {project['id']}
              projectTitle = {project["projectTitle"]}
              projectDescription = {project["projectDescription"]}
              photo = {project["photo"]}/> 
          )
        })
      }
    }


    return (
        <div className={classes.Projects}>
          {projects}
        </div>
        
    );
 
}

// export default Radium(UserPage);
export default projects;