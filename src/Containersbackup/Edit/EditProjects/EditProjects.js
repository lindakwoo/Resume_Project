import React from "react";
import classes from './EditProjects.module.css'
import NewProject from './NewProject/NewProject';
import ProjectEdit from './ProjectEdit/ProjectEdit';

const editProjects =(props)=>{

    let projects = <div>no projects at this time</div> 
        if(props.currentPerson["username"]){
            if(props.projects.length>0){
                projects = props.projects.map(project=>{
                    return (
                      <ProjectEdit
                        key = {project["id"]}
                        currentPersonId = {props.currentPersonId}
                        projectId = {project["id"]}
                        projectTitle = {project["projectTitle"]}
                        projectDescription = {project["projectDescription"]}
                        photo = {project["photo"]||"http://via.placeholder.com/300"}
                        />
                    )
                })
            }
        }

    return (
        <div className = {classes.Projects}>
              <div className = {classes.CurrentProjects}>
              <h1>Edit your projects</h1>
              <div>{projects}</div>
              </div>
              <div className = {classes.NewProject}>
              <h1>Add a new project</h1>
                <NewProject currentPersonId={props.currentPersonId}/>
              </div>
        </div>

    )


    
}

export default editProjects;