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
                        deleteProjectFromEdit = {props.deleteProjectFromEdit}
                        />
                    )
                })
            }
        }

    return (
        <div className = {classes.ProjectsContainer}>
            <div className = {classes.CurrentProjects}>
            {projects}
            </div>         
            <h3>Add a new project</h3>
            <NewProject currentPersonId={props.currentPersonId} addProjectToEdit = {props.addProjectToEdit}/>
        </div>

    )


    
}

export default editProjects;